const CaverExtKAS = require('caver-js-ext-kas')

const caver = new CaverExtKAS()

const accessKeyId ="KASKD8OBN35HIAOIH3372DU1"
const secretAccessKey ="b385L_GJcLb0NvW2d6-NSGZDocU1J4hORvEPJIdH"
const chainId=1001


caver.initKASAPI(chainId,accessKeyId,secretAccessKey) //initKASAPI가 초기화 기능 

const keyringContainer = new_caver.keyringContainer()

const keyring = keyringContainer.keyring.createFromPrivateKey("0x482117574dC57CEec699A9C171D7260d6e91124A")

keyringContainer.add(keyring)


//블록체인 azure 서비스로 자체 지갑을 만들고 여러 지갑을 만들 수 있다. 


//Create Token function

//js는 위에서 부터 실행되지만 , 먼저 실행되는 것부터 실해되어서 속도의 차이가 없다. 비동기처리 , callback함수
//async는 함수를 비동기처리 한다 
//await는 그 줄의 해당하는 명령어가 끝날때까지 기다린다
async function CreateToken() {
    const kip7 = await caver.kct.kip7.deploy({
        name: 'OEI',
        symbol : 'OEI'
        
    },keyring.address,keyringContainer)
    console.log(kip7)


    
}

CreateToken()


