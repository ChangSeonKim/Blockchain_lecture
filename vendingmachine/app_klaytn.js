const contractInfo = require('./VendingMahchine_klaytn.json')
const Caver = require("caver-js")
require('dotenv').config();

const cav = new Caver("https://api.baobab.klaytn.net:8651")

const abi =contractInfo.abi
const address = contractInfo.address

const smartContract = new cav.klay.Contract(abi, address)
// console.log(smartContract)

const account = cav.klay.accounts.createWithAccountKey(process.env.KAIKAS_ADDRESS, process.env.KAIKAS_PRIVATE_KEY)
console.log(account.address)
const wallet = cav.klay.accounts.wallet.add(account)
// console.log(wallet)
// smartContract.methods.getVendingMachineBalance().call()
// .then(result=>{
//     console.log(result)
// })

async function getDonuts() {
    let donutNumbers = await smartContract.methods.getVendingMachineBalance().call()
    console.log(donutNumbers)
}

getDonuts()

const donutPurchase = async (amount)=> {
    receipt = await smartContract.methods.purchase(amount).send({
        from:account.address,
        gas:200000
    })
    console.log(receipt)
}


const donutRestock = async (amount)=> {
    
    receipt = await smartContract.methods.restock(amount).send({
        from:account.address,
        gas:200000
    })
    console.log(receipt)
}

// donutPurchase(20)



// donutRestock(1000000000000)
// donutPurchase()