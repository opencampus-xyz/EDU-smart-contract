const {expect} = require('chai');
const {ethers} = require('hardhat');
const {runBehaviorTests} = require('@animoca/ethereum-contract-helpers/src/test/run');
const {loadFixture} = require('@animoca/ethereum-contract-helpers/src/test/fixtures');
const {getDeployerAddress} = require('@animoca/ethereum-contract-helpers/src/test/accounts');
const {getForwarderRegistryAddress} = require('@animoca/ethereum-contracts/test/helpers/registries');
const {behavesLikeERC20} = require('@animoca/ethereum-contracts/test/contracts/token/ERC20/behaviors/ERC20.behavior');

const name = 'EDU';
const symbol = 'EDU';
const decimals = ethers.BigNumber.from('18');
const tokenURI = 'https://web3.tinytap.it';
const recipients = []; //['0x4470C9799e3BCb1e97dFF44fd63122645B46125D']
const amounts = []; //[100]

const config = {
  immutable: {
    name: 'EDuCoinMock',
    ctorArguments: ['name', 'symbol', 'decimals', 'recipients', 'amounts', 'forwarderRegistry'],
    testMsgData: true,
  },
  defaultArguments: {
    name,
    symbol,
    decimals,
    recipients,
    amounts,
    forwarderRegistry: getForwarderRegistryAddress,
    initialAdmin: getDeployerAddress,
    initialOwner: getDeployerAddress,
  },
};

runBehaviorTests('EDuCoinMock', config, function (deployFn) {
  const implementation = {
    name,
    symbol,
    decimals,
    tokenURI,
    recipients,
    amounts,
    revertMessages: {
      // ERC20
      ApproveToZero: 'ERC20: approval to address(0)',
      TransferExceedsBalance: 'ERC20: insufficient balance',
      TransferToZero: 'ERC20: transfer to address(0)',
      TransferExceedsAllowance: 'ERC20: insufficient allowance',
      InconsistentArrays: 'ERC20: inconsistent arrays',
      SupplyOverflow: 'ERC20: supply overflow',
      // ERC20Allowance
      AllowanceUnderflow: 'ERC20: insufficient allowance',
      AllowanceOverflow: 'ERC20: allowance overflow',
      // ERC20BatchTransfers
      BatchTransferValuesOverflow: 'ERC20: values overflow',
      // ERC20SafeTransfers
      SafeTransferRejected: 'ERC20: safe transfer rejected',
      // ERC2612
      PermitFromZero: 'ERC20: permit from address(0)',
      PermitExpired: 'ERC20: expired permit',
      PermitInvalid: 'ERC20: invalid permit',
      // Admin
      NotMinter: "AccessControl: missing 'minter' role",
      NotContractOwner: 'Ownership: not the owner',
    },
    features: {
      // ERC165: true,
      EIP717: true, // unlimited approval
      AllowanceTracking: true,
    },
    interfaces: {
      ERC20: true,
      ERC20Detailed: true,
      ERC20Metadata: true,
      ERC20Allowance: true,
      ERC20BatchTransfer: true,
      ERC20Safe: true,
      ERC20Permit: true,
    },
    methods: {},
    deploy: async function (initialHolders, initialBalances, deployer) {
      const contract = await deployFn({
        recipients: initialHolders,
        amounts: initialBalances,
      });
      return contract;
    },
  };

  let deployer;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  describe('EDuCoin allocation on deployment', function () {
    const testAllocations = [
      {
        wallet: '0xABCE7FE58Ba3Dc24685416201175aCe8Bfb5C451',
        amount: ethers.utils.parseUnits('50000000', 'ether'),
      },
      {
        wallet: '0x309cd07e1bA2B459Fb90237C6BF09457C87EbBFF',
        amount: ethers.utils.parseUnits('100000000', 'ether'),
      },
      {
        wallet: '0x62a69D28DCFeb4A8579c3b70cd479C77fF60F10B',
        amount: ethers.utils.parseUnits('75000000', 'ether'),
      },
    ];

    const tokenHolders = testAllocations.map((allocation) => allocation.wallet);
    const tokenAmounts = testAllocations.map((allocation) => allocation.amount);

    const fixture = async function () {
      this.token = await implementation.deploy(tokenHolders, tokenAmounts, deployer);
    };

    beforeEach(async function () {
      await loadFixture(fixture, this);
    });

    it('check that totalSupply equal to all holders allocations', async function () {
      const totalSupply = tokenAmounts.reduce((accumulator, currentValue) => BigInt(accumulator) + BigInt(currentValue), 0);
      await this.token.totalSupply().then((contractTotal) => {
        expect(contractTotal).to.eq(totalSupply);
      });
    });

    it('check each user has the correct allocation', async function () {
      for (let i = 0; i < tokenHolders.length; i++) {
        await this.token.balanceOf(tokenHolders[i]).then((userBalance) => {
          expect(userBalance).to.eq(BigInt(tokenAmounts[i]));
        });
      }
    });
  });

  behavesLikeERC20(implementation);
});
