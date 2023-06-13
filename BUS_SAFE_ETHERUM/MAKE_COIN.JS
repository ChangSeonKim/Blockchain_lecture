require('dotenv').config()

const CaverExtKAS = require("caver-js-ext-kas");

const caver = new CaverExtKAS();
const chainId = 1001;

caver.initKASAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);

const keyringContainer = new caver.keyringContainer();
const keyring = keyringContainer.keyring.createFromPrivateKey("0x98ceeaa1d4108b7cdbe4cc575db9d5a7eb444ea856f0853f7861d9bef0f5ad9f");

keyringContainer.add(keyring);


async function createToken() {
    const kip7 = await caver.kct.kip7.deploy(
      {
        name: "SAFECOIN",
        symbol: "SC",
        decimals: 0,
        initialSupply: "10000000000000",
      },
      keyring.address,
      keyringContainer
    );
  }
  
createToken()






