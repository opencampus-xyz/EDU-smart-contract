require('dotenv').config();
const {mergeConfigs} = require('@animoca/ethereum-contract-helpers/src/config');

require('@animoca/ethereum-contract-helpers/hardhat-plugins');
require('@animoca/ethereum-migrations/hardhat-plugins');

module.exports = mergeConfigs(
  require('@animoca/ethereum-contract-helpers/hardhat-config'),
  require('@animoca/ethereum-contracts/hardhat-config'),
  require('@animoca/ethereum-migrations/hardhat-config'),
  require('./hardhat-config')
);
