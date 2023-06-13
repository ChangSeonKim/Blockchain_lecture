require('dotenv').config();
const contractInfo = require("./BusSafe.json")

const abi = contractInfo.abi
const address = contractInfo.address

const Web3 = require("web3")
const mysql = require('mysql2');
const mongoDBClass = require('./Utils')

const web3 =new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")) 
// console.log(web3)
const smartContract  = new web3.eth.Contract(abi , address)
// console.log(smartContract.events.allEvents())
// web3.eth.getBlock()
// .then(result=>{
//     console.log(result)
// })

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
    accounts = await web3.eth.getAccounts();
    
    receipt = await smartContract.methods.AddCheckList(carId , res, etc, date).send({
        from:accounts[1],
        gas:200000
    })
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
        console.log(results)  
        connection.end(); 
    });
    });

    await mongoDBClass.check_res(address, blockNumber,returnValues)
    // console.log(receipt.events)
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
// addCheck("25서2602", "엔진디젤", "청소상태양호", 202304241230)

// checkListNumer()
// getCheck(1)
// getEvents()