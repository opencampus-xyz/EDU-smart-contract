# EDU - Education Coin ERC-20 contract

This project contains the solidity contract for the OpenCampus EDU Token.

## Audits

| Date       | Scope            | Commit                                                                                                                          | Auditor                                  | Report                                                       |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| 17/03/2023 | EDC ERC-20 Token | [6fd45c2db3a1e41113135151814bcbc9e618f1f0](https://github.com/opencampus-xyz/EDU-smart-contract/blob/main/contracts/EDuCoin.sol) | [Solidified](https://www.solidified.io/) | [link](/audits/Audit_Report_EDUCoin.pdf) |

## Solidity contracts

Only the contracts corresponding to the features developed for the current version of the module are present.

## Compilation artifacts

The compilation artifacts, including the debug information, are available in the `artifacts` folder, both in the git repository and the release packages.

## Development

Install the dependencies:

### Installation

```bash
yarn install
```

### Compile the contract

```bash
yarn compile
```

### Run the tests coverage

```bash
yarn test
yarn coverage
```

## Deploy Contract

### TestNet

_BSCtestnet:_ `yarn deploy:bsctest`

_Goerli:_ `yarn deploy:goerli`

### MainNet

_BSC:_
`yarn deploy:bsc`

_Ethereum:_
`yarn deploy:mainnet`

## Verify Contract

### TestNet

_BSCtestnet:_ `yarn verify:bsctest`

_Goerli:_ `yarn verify:goerli`

### MainNet

_BSC:_ `yarn verify:bsc`

_Ethereum:_ `yarn verify:mainnet`

\_

_See `package.json` for additional commands._
