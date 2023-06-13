const CaverExtKAS = require("caver-js-ext-kas");

const caver = new CaverExtKAS();

const accessKeyId = "accessKeyId";
const secretAccessKey = "secretAccessKey";
const chainId = 1001;

caver.initKASAPI(chainId, accessKeyId, secretAccessKey);

const keyringContainer = new caver.keyringContainer();
const keyring = keyringContainer.keyring.createFromPrivateKey("keyring");

keyringContainer.add(keyring);

async function createToken() {
  const kip7 = await caver.kct.kip7.deploy(
    {
      name: "name",
      symbol: "symbol",
      decimals: 0,
      initialSupply: "10000",
    },
    keyring.address,
    keyringContainer
  );
}

async function transferToken(address, amount) {
  const bhsToken = await new caver.kct.kip7("bhsToken");

  await bhsToken.setWallet(keyringContainer);
  const receipt = await bhsToken.transfer(address, amount, {
    from: keyring.address,
  });
}

async function getBalance(address) {
  const bhsToken = await new caver.kct.kip7("bhsToken");

  const balance = await bhsToken.balanceOf(address);
  console.log(balance);
}

async function createWallet() {
  const wallet = await caver.kas.wallet.createAccount();
  console.log(wallet);
}

// createToken();
// transferToken("", "1000");
// getBalance("");
