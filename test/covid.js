const covid_contract = artifacts.require("Covid");
const utils = require("./helpers/utils");
const jsSHA = require("jssha");

contract("Covid Test", (accounts) =>{
	let [owner, minestry, hub, user1, user2] = accounts;

	it("should be able to add minestry from owner", async() =>{
		const covidInstance = await covid_contract.deployed();
		const minestryResult = await covidInstance.addMinestry(minestry, {from: owner});
		assert.equal(minestryResult.receipt.status, true);
		assert.equal(minestryResult.logs[0].args.ministryAddress, minestry);
	})

	it("shouldn't be able to add minestry from anyway isn't owner of contract",async() =>{
		const covidInstance = await covid_contract.deployed();
        await utils.shouldThrow(covidInstance.addMinestry(hub, {from: minestry}));
	})

	it("should be able to add hub from minestry", async() =>{
		const covidInstance = await covid_contract.deployed();
		const hubResult = await covidInstance.addHub(hub, {from: minestry});
		assert.equal(hubResult.logs[0].args.hubAddress, hub);
	})

	it("shouldn't be able to add hub from anyway isn't minestry",async() =>{
		const covidInstance = await covid_contract.deployed();
        await utils.shouldThrow(covidInstance.addHub(user1, {from: hub}));
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
		/*
		assert.equal(vaccineResult.logs[0].args.user, user2); 
		assert.equal(vaccineResult.logs[0].args.from, hub);
		assert.equal(vaccineResult.logs[0].args.result, false);  
		*/
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