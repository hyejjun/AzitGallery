const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const privateKey = "0x994a5e7b465b385dc120f6c8d74dcf1e7ca893101bf8a0552c892b15dbc1afec" // Enter your private key;

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
      provider: () => new HDWalletProvider(privateKey, "https://kaikas.cypress.klaytn.net:8651/"),
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