require('dotenv').config()
const mongoose = require('mongoose');
const {checkModel, detailChecks} = require('./models')

mongoDBClass = {
    url : process.env.URL,
    check_res :async function(address , blockNumber,returnValues){
        await mongoose.connect(process.env.URL);
        var CheckRes = new checkModel();
        CheckRes.address = address
        CheckRes.blockNumber = blockNumber
        CheckRes.returnValues =  returnValues

                // 9. 데이터 저장
        // CheckRes.save()
        // .then(result=>{
        //     console.log(result)
        //     mongoose.connection.close()
        // });

        result = await CheckRes.save()
        console.log(result)
        await mongoose.connection.close()
    }, 

    check_details:function(carId, blockNumber ,blockHash ,engineOil ,missionOil,gasBoxCheck,tireCheck ,lightCheck){
        mongoose.connect(process.env.URL);
        var detailCheck = new detailChecks()
        detailCheck.carId= carId
        detailCheck.blockNumber= blockNumber
        detailCheck.blockHash= blockHash
        detailCheck.engineOil= engineOil
        detailCheck.missionOil= missionOil
        detailCheck.gasBoxCheck= gasBoxCheck
        detailCheck.tireCheck= tireCheck
        detailCheck.lightCheck= lightCheck

        detailCheck.save()
        .then(result=>{
            console.log(result)
            mongoose.connection.close()
        });

    }

}


// mongoDBClass.check_res('0x377Af27696eed0971d81BD46bA390D210A2b9e86', 130, {a:1,b:2})
mongoDBClass.check_details("carId", 300 ,"blockHash" ,"engineOil" ,"missionOil","gasBoxCheck","tireCheck" ,"lightCheck")
module.exports = mongoDBClass;