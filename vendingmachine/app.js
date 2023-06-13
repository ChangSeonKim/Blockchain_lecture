require('dotenv').config();
const abiJson = require("./VendingMachine.json")
const contractAbi = require("./vendingMachine.js")

// const abi = process.env.ABI
// const abi =abiJson.abi
const abi = contractAbi.ABI.abi
const address = abiJson.address
// console.log(abi)

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"))

// HTTP://127.0.0.1:7545/  블록체인 네트워크 주소
// http - 전송방식  127.0.0.1 주소 7545 프로토콜 뒤 / 이후는 경로
const smartContract = new web3.eth.Contract(abi,address)

// smartContract.methods.getVendingMachineBalance().call().then(function(result){
//     console.log(result) 방법1
// })

// async function getDonuts(){
//     let donutNumbers = await smartContract.methods.getVendingMachineBalance().call()
//     console.log(donutNumbers)
// } // promise pending 처리 방법 2

// getDonuts()


const donutPurchase = async (amount)=> {
    accounts = await web3.eth.getAccounts();
    balance = await web3.utils.toWei('0.02', 'ether')
    receipt = await smartContract.methods.purchase(amount).send({
        from:accounts[0],
        value:balance
    })
    console.log(receipt)
}


donutPurchase(100)