require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.



// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "7QIMOcehuzA_qoRWHJJNrj1p5_gvNgtz";
const ALCHEMY_API_KEY_MAINNET = "mGa7iHY28EtC0MlD-aB3_Cyp8ALb-_oA";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const RINKEBY_PRIVATE_KEY = "47db2587b9608e822ef37837b24384ab21e7778c311c9173e0f12618741d4f11";
const MAINNET_PRIVATE_KEY = "bb5a3746c3d150731a707ad23eaff486d0dedb8bf40d1d509ae0f8e48a9a9b26";

require("./tasks/faucet");

module.exports = {
  solidity: {
   compilers: [
     {
       version: "0.4.14",
     },
     {
       version: "0.8.7",
       settings: {},
     },
     {
       version: "0.7.6",
       settings: {},
     },
   ],
   overrides: {
     "contracts/DadaCollectible.sol": {
       version: "0.4.14",
       settings: { }
     }
   }
 },
 networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 2000000000
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 54000000000
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "UQH2MTYDZF63RM688RKE3IKF4P92EBP8EB"
  }
};
