const {loadConfigFolder} = require('@animoca/ethereum-contract-helpers/src/config');
const config = loadConfigFolder(__dirname);
module.exports = config;
