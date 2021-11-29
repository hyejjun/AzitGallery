const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const privateKey = "0xe7b6fefa904562b928ab1aa3214f2dc6210f511ed6d1a385291c22a3c3b0783f" // Enter your private key;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://kaikas.baobab.klaytn.net:8651/"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://your.cypress.en.url:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },
  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};