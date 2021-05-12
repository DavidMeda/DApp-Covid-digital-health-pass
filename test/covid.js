const covid_contract = artifacts.require("Covid");
const utils = require("./helpers/utils");
const jsSHA = require("jssha");

console.log("This test run only on private Ganache network");

contract("Covid Test", (accounts) =>{
	let [owner, ministry, hub, user1] = accounts;

	it("should be able to add ministry from owner", async() =>{
		const covidInstance = await covid_contract.deployed();
		const ministryResult = await covidInstance.addMinistry(ministry, {from: owner});
		assert.equal(ministryResult.logs[0].args.ministryAddress, ministry);
	})

	it("should be able to remove ministry from owner", async() =>{
		const covidInstance = await covid_contract.deployed();
		const ministryResult = await covidInstance.removeMinistry(ministry, {from: owner});
		assert.equal(ministryResult.logs[0].args.ministryAddres, ministry);
	})

	it("shouldn't be able to add ministry from anyway isn't owner of contract",async() =>{
		const covidInstance = await covid_contract.deployed();
        await utils.shouldThrow(covidInstance.addMinistry(hub, {from: ministry}));
	})

	it("shouldn't be able to remove ministry from anyway isn't owner of contract",async() =>{
		const covidInstance = await covid_contract.deployed();
        await utils.shouldThrow(covidInstance.removeMinistry(hub, {from: ministry}));
	})


	it("should be able to add hub from ministry", async() =>{
		const covidInstance = await covid_contract.deployed();
		await covidInstance.addMinistry(ministry, {from: owner});
		const hubResult = await covidInstance.addHub(hub, {from: ministry});
		assert.equal(hubResult.logs[0].args.hubAddress, hub);
	})

	it("should be able to remove hub from ministry", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hubResult = await covidInstance.removeHub(hub, {from: ministry});
		assert.equal(hubResult.logs[0].args.hubAddres, hub);
	})

	it("shouldn't be able to add hub from anyway isn't ministry",async() =>{
		const covidInstance = await covid_contract.deployed();
		await covidInstance.addMinistry(ministry, {from: owner});
        await utils.shouldThrow(covidInstance.addHub(user1, {from: hub}));
	})

	it("shouldn't be able to remove hub from anyway isn't ministry",async() =>{
		const covidInstance = await covid_contract.deployed();
        await utils.shouldThrow(covidInstance.removeHub(user1, {from: hub}));
	})

	function calculateHashBytes (data) {
		  let  shaObj = new jsSHA("SHA-256", "TEXT");
		  shaObj.update(data);
		  let hash = "0x" + shaObj.getHash("HEX");
		  return hash;
	}

	it("should be approve vacine of user only from hub", async()=>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("VACCINE");
		await covidInstance.addHub(hub, {from: ministry});
		const vaccineResult = await covidInstance.approveVaccine(hash_ID, hash_Vaccine, user1, {from: hub});
		assert.equal(vaccineResult.logs[0].args.user, user1); 
		assert.equal(vaccineResult.logs[0].args.from, hub);
		assert.equal(vaccineResult.logs[0].args.hashCertificate, hash_Vaccine);  
	})


	it("shouldn't be approve vacine if user is already vaccinated", async()=>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("VACCINE");
		await utils.shouldThrow( covidInstance.approveVaccine(hash_ID, hash_Vaccine, user1, {from: hub}));
	})

	it("shouldn't be approve vacine of user from anyway isn't hub", async()=>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("VACCINE");
		await utils.shouldThrow(covidInstance.approveVaccine(hash_ID, hash_Vaccine, user1, {from: user1}));
	})

	it("should be approve test of user only from hub", async()=>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Test = calculateHashBytes("TEST");
		const testResult = await covidInstance.approveTest(hash_ID, hash_Test, true, user1, {from: hub});
		assert.equal(testResult.logs[0].args.user, user1); 
		assert.equal(testResult.logs[0].args.from, hub);
		assert.equal(testResult.logs[0].args.positivity, true);  
	})

	it("shouldn't be approve test of user from anyway isn't hub", async()=>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("TEST");
		await utils.shouldThrow(covidInstance.approveVaccine(hash_ID, hash_Vaccine, true, user1, {from: user1}));
	})


	it("verification TRUE vaccine", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("VACCINE");
		const vaccineResult = await covidInstance.verificationVaccine(hash_ID, hash_Vaccine, user1);
		assert.equal(vaccineResult[0], true);
	})

	it("verification FAKE vaccine", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Vaccine = calculateHashBytes("VACCIN");
		const vaccineResult = await covidInstance.verificationVaccine(hash_ID, hash_Vaccine, user1);
		assert.equal(vaccineResult[0], false);
		assert.equal(vaccineResult[1].toNumber(), 0);
	})

	it("verification TRUE test", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Test = calculateHashBytes("TEST");
		const testResult = await covidInstance.verificationTest(hash_ID, hash_Test, user1);
		assert.equal(testResult[0], true);
		assert.equal(testResult[2], true); //the last test pubblish is false (negative)
	})

	it("verification FAKE test", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hash_ID = calculateHashBytes("DOCUMENT_ID");
		const hash_Test = calculateHashBytes("TESTT");
		const testResult = await covidInstance.verificationTest(hash_ID, hash_Test, user1);
		assert.equal(testResult[0], false);
		assert.equal(testResult[1].toNumber(), 0);
	})


})