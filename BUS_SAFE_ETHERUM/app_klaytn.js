const contractInfo = require('./BusSafe_Klaytn.json')
const Caver = require("caver-js")
require('dotenv').config();
const mysql = require('mysql2');
const mongoDBClass = require('./Utils')


const cav = new Caver("https://api.baobab.klaytn.net:7545")

const abi =contractInfo.abi
const address = contractInfo.address

const smartContract = new cav.klay.Contract(abi, address)
console.log(smartContract)

const account = cav.klay.accounts.createWithAccountKey(process.env.KAIKAS_ADDRESS, process.env.KAIKAS_PRIVATE_KEY)
console.log(account.address)
const wallet = cav.klay.accounts.wallet.add(account)


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "bussafe"
  });

// connection.end();


// var sql = 'select * from checkres'
// connection.query(sql, function(err, rows, fields)
//   {
//       if (err) {
//           console.error('error connecting: ' + err.stack);
//       }

//       for (let i=0;i<rows.length;i++) {
//         console.log(rows[i].returnValues);
//       }
      
          
//   });
const addCheck = async (carId, res, etc, date)=> {
    
    
    receipt = await smartContract.methods.AddCheckList(carId , res, etc, date).send({
        from:process.env.KAIKAS_ADDRESS,
        gas:2000000
    })

    console.log(receipt)
    var address = receipt.events.AddCheck.address
    var blockNumber = receipt.events.AddCheck.blockNumber
    var returnValues =receipt.events.AddCheck.returnValues
        console.log(receipt.events.AddCheck.returnValues)
    // connection.connect();
    await connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO checkres (address, blockNumber, returnValues) VALUES (?, ?, ?);`
        
        connection.query(sql,[address, blockNumber,JSON.stringify(returnValues)],function (error, results, fields) {
        if (error)
            throw error;
        console.log('Insert Success');
        // console.log(results)  
        connection.end(); 
    });
    });
    let blockHash = receipt.events.AddCheck.blockHash
    await mongoDBClass.check_res(address, blockNumber,returnValues)
    // console.log(receipt.events)
    await mongoDBClass.check_details(carId, blockNumber,blockHash,"불량","불량","양호","양호","불량")


}


async function checkListNumer() {
    let number = await smartContract.methods.TotalCount().call()
    console.log(number)
}

async function getCheck(index) {
    let result = await smartContract.methods.GetCheck(index).call()
    console.log(result)
}


async function getEvents(){
    results = await smartContract.getPastEvents('AddCheck', {
        filter:{car_id:'140호9212'},
        fromBlock: 0,
        toBlock: 'latest'
    }, function(err , events){console.log(events);})

    console.log(results)
    
}
// // console.log(process.env.ADDRESS)
addCheck("28서2000", "엔진전기fqweweffwewefwefefwfwewfewefewffwefwe", "청fwefwefwe소fewefwefwef상태양호", 202304241230)

// checkListNumer()
// getCheck(1)
// getEvents()