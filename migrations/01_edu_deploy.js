const {utils} = require('ethers');
const {skipChainTypesExceptFor} = require('@animoca/ethereum-migrations/src/helpers/common');
const {getContractAddress} = require('@animoca/ethereum-migrations/src/helpers/templates');
const Contract_deploy = require('@animoca/ethereum-migrations/src/templates/Contract/deploy');

async function getAllocations(hre) {
  const namedAccounts = await hre.getNamedAccounts();

  /*const mainnetAllocations = [
    {
      name: 'LAUNCHPAD_PUBLIC_SALE_WALLET',
      address: namedAccounts.LAUNCHPAD_PUBLIC_SALE_WALLET,
      amount: '900000000',
    },
    {
      name: 'LIQUIDITY_POOL_WALLET',
      address: namedAccounts.LIQUIDITY_POOL_WALLET,
      amount: '900000000',
    },
    {
      name: 'EARLY_CONTRIBUTOR_POOL_WALLET',
      address: namedAccounts.EARLY_CONTRIBUTOR_POOL_WALLET,
      amount: '300000000',
    },
    {
      name: 'ECOSYSTEM_FUND_WALLET',
      address: namedAccounts.ECOSYSTEM_FUND_WALLET,
      amount: '200000000',
    },
    {
      name: 'TREASURY_WALLET',
      address: namedAccounts.TREASURY_WALLET,
      amount: '273946700',
    },
    {
      name: 'STRATEGIC_INVESTORS_WALLET',
      address: namedAccounts.STRATEGIC_INVESTORS_WALLET,
      amount: '6053300',
    },
    {
      name: 'ADVISORS_WALLET',
      address: namedAccounts.ADVISORS_WALLET,
      amount: '20000000',
    },
    {
      name: 'MARKETING_WALLET',
      address: namedAccounts.MARKETING_WALLET,
      amount: '400000000',
    },
    {
      name: 'TEAM_WALLET',
      address: namedAccounts.TEAM_WALLET,
      amount: '400000000',
    },
  ];*/
  const mainnetAllocations = [
    {
      name: 'TOTAL_SUPPLY_WALLET',
      address: namedAccounts.TOTAL_SUPPLY_WALLET,
      amount: '1000000000',
    },
  ];
  const testnetAllocations = [
    {
      name: 'Deployer',
      address: namedAccounts.deployer,
      amount: '2000000000',
    },
    ...mainnetAllocations,
  ];

  const allocations = hre.network.tags.production ? mainnetAllocations : testnetAllocations;
  return allocations;
}

module.exports = Contract_deploy('EDuCoin', {
  contract: 'EDuCoin',
  args: [
    {
      name: 'tokenName',
      value: 'EDU Coin',
    },
    {
      name: 'tokenSymbol',
      value: 'EDU',
    },

    {
      name: 'tokenDecimals',
      value: 18,
    },
    {
      name: 'holders',
      value: async (hre) => (await getAllocations(hre)).map((allocation) => allocation.address),
    },
    {
      name: 'amounts',
      value: async (hre) => (await getAllocations(hre)).map((allocation) => utils.parseEther(allocation.amount)),
    },
    {
      name: 'ForwarderRegistry',
      value: getContractAddress('ForwarderRegistry@1.0'),
    },
  ],
});
module.exports.skip = skipChainTypesExceptFor('bsc');
module.exports.dependencies = ['ForwarderRegistry@1.0_deploy'];
