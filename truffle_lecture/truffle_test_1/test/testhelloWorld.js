var HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld" , (accounts)=>{

    console.log(accounts)
    it("should bd returned Hello World!!" , async ()=>{
        const smartContract = await HelloWorld.deployed()
        const hello = await smartContract.hello()
        assert(hello === "World!!", "returns is wronging")
    })
})