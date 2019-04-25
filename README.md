# Dephi
Borrow and Lend Crypto with Dephi

Don't let your assets sit idle! Dephi allows you to earn money from holding crypto, and borrow funds whenever you need.

# About
This repository is home to the Dephi web application--a dApp that allows users to borrow and lend their crypto assets with the Compound Finance MoneyMarket.

### TOC:
[Usage](#usage)

[Primary Tools & Technologies](#primary%20tools%20%26%20technologies)

[Folder Structure](#folder%20structure)

[Contact Info](#contact%20info)

# Usage

### Branches
The default branch is __dev__.
Changes are merged in from __dev__ to __master__ before being deployed to production.

### Requirements

- Node >= 6
- npm >= 5.2

1. Clone this repository
2. In the root of /api add a .env file with 3 API keys
```
CRYPTO_COMPARE_KEY="Apikey <key>"
COMPOUND_KEY="<key>"
ETHERSCAN_KEY="<key>"
```
3. Run the api server
```
$ cd ambo
$ cd api
$ yarn install
$ npm run dev
```
4. Run the client
```
$ cd ambo
$ cd client
$ yarn install
$ npm run start
```

### Implemented (Mainnet)

- "Connect" your MetaMask wallet
- Check your Compound Finance balances
- View Compound Finance assets and their rates
- Approve an ERC20 by clicking "Activate"
- Lend funds and earn interest

### In Progress

- Borrow, repay, and withdraw (In the meantime, these can be done on the Compound Finance app until completed here.)
- Rinkeby Testnet
- i18n

# Primary Tools & Technologies

### Client:
- [React.js v16.8.5](https://reactjs.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Ant Design](https://ant.design/)
- [Reactstrap](https://reactstrap.github.io/)

### API:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

### Integrations:
- [Compound Finance](https://compound.finance/)
- [web3.js](https://github.com/ethereum/web3.js/)
- [Crypto Compare](https://www.cryptocompare.com/)
- [Etherscan](https://etherscan.io)

# Folder Structure

```
•
├── api - API server using web3 to interact with Compound Finance, and other Ethereum related APIs
│   ├── public - A splash page for the API
│   └── src - All application logic
│       ├── bin - HTTP server
│       ├── controllers - Request/response logic
│       ├── routes - URIs
│       ├── services - HTTP clients for third party APIs
│       └── utils - Helper modules
└── client - Frontend web interface
    ├── public - HTML page where the SPA is rendered
    └── src - All application logic
        ├── components - Components that have no route
        ├── data - JSON files holding static data
        ├── ethereum - Utilities to connect to Ethereum via web3
        ├── images - Image files
        ├── pages - Components that have their own route
        └── store - Redux store configuration and logic
```

# Contact Info

For questions please contact lead maintainer @thevaleriemack
