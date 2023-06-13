const mongoose = require('mongoose');
const {checkModel, detailChecks} = require('./models')
mongoose
  .connect(
    'mongodb+srv://root:1234@kblockchain.q86chqg.mongodb.net/?retryWrites=true&w=majority',
    {
    //   useNewUrlPaser: true,
    //   useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });







// 8. Student 객체를 new 로 생성해서 값을 입력
var CheckRes = new checkModel();
CheckRes.address = "0x377Af27696eed0971d81BD46bA390D210A2b9e86"
CheckRes.blockNumber = 125
CheckRes.returnValues =  {
  '0': '0xDF3048daF14CD38EeA2F497916755D1630B1D5eB',
  '1': '140호9212',
  '2': '엔진bed',
  '3': '청소상태양호',
  '4': '202304240910',
  checker: '0xDF3048daF14CD38EeA2F497916755D1630B1D5eB',
  car_id: '140호9212',
  check_res: '엔진bed',
  check_etc: '청소상태양호',
  check_time: '202304240910'
}

var detailCheck = new detailChecks()
detailCheck.carId= "서울가2345",
detailCheck.blockNumber= 123,
detailCheck.blockHash= "0x123jasdjlilfa",
detailCheck.engineOil= "Y",
detailCheck.missionOil= "Y",
detailCheck.gasBoxCheck= "Y",
detailCheck.tireCheck= "Y",
detailCheck.lightCheck= "Y",

// 9. 데이터 저장
detailCheck.save()
.then(result=>{
    console.log(result)
});


// Student.find()
// .then(function(error, students){
//     console.log('--- Read all ---');
//     if(error){
//         console.log(error);
//     }else{
//         console.log(students);
//     }
// })