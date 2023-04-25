module.exports = {
  external: {
    contracts: [
      {
        artifacts: [
          'node_modules/@animoca/ethereum-contracts-1.0/artifacts',
          'node_modules/@animoca/ethereum-contracts-bridging-0.3/artifacts',
          'node_modules/@animoca/ethereum-migrations/imports',
        ],
        deploy: 'node_modules/@animoca/ethereum-migrations/migrations',
      },
    ],
    deployments: {
      hardhat: ['node_modules/@animoca/ethereum-migrations/deployments/all'],
      localhost: ['node_modules/@animoca/ethereum-migrations/deployments/all'],
      mainnet: ['node_modules/@animoca/ethereum-migrations/deployments/mainnet', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      goerli: ['node_modules/@animoca/ethereum-migrations/deployments/goerli', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      matic: ['node_modules/@animoca/ethereum-migrations/deployments/matic', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      mumbai: ['node_modules/@animoca/ethereum-migrations/deployments/mumbai', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      bsctest: ['node_modules/@animoca/ethereum-migrations/deployments/bsctest', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
      bsc: ['node_modules/@animoca/ethereum-migrations/deployments/bsc', 'node_modules/@animoca/ethereum-migrations/deployments/all'],
    },
  },
};
