const mongoose = require('mongoose');

var checkRes = mongoose.Schema({
    address: { type: String , required: true },
    blockNumber: {type: Number, required:true  },
    returnValues: {type: mongoose.Schema.Types.Mixed , required:true},
    createAt: {type: Date , required:true, default: () => new Date()}
});

let detailCheck = mongoose.Schema({
    carId: { type: String, required: true},
  blockNumber: { type: Number, required: true },
  blockHash: { type: String, required: true },
  engineOil: { type: String, required: true },
  missionOil: { type: String, required: true },
  gasBoxCheck: { type: String, required: true },
    tireCheck: { type: String, required: true },
    lightCheck: { type: String, required: true },
  createTime: { type: Date, required: true, default: () => new Date()},
});
// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var checkModel = mongoose.model('checklist', checkRes);
var detailChecks = mongoose.model('detailCheck', detailCheck);

module.exports = {checkModel: checkModel ,detailChecks:detailChecks };
