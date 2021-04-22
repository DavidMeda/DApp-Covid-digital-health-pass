console.log("HELLO");
var account;
var contract_address = "0x94D79c7D6407a1dCDe7528668aDf222dbd9fbe15";
var web3;
var contract;


function getAccounts(callback) {
	window.web3.eth.getAccounts((error, result) => {
		if (error) {
			console.log(error);
		} else {
			callback(result);
		}
	});
}

window.addEventListener('load', init);
async function init() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		web3 = new Web3(window.ethereum);
	} else {
		console.log('Injected web3 Not Found!!!')
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

		var provider = document.getElementById('provider_url').value;
		window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
	}

	if (window.ethereum) {
		try {
			await ethereum.enable();
		} catch (err) {
			allert("Access to your Ethereum account rejected." + error);
		}
	}
	$('#AddressAccount').html('<strong>Your addres is :' + ethereum.selectedAddress + '</strong>');

	contract = new web3.eth.Contract(CovidABI, contract_address);
};


$('document').ready(function () {


	//ADD MINESTRY
	document.getElementById("buttonAddressMinestry").addEventListener('click', addMinestry);
	var inputAddressMinestry = document.getElementById("inputAddressMinestry")

	async function addMinestry() {
		if (inputAddressMinestry.value.startsWith("0x")) {

			console.log("MyAddress: " + ethereum.selectedAddress);
			console.log("Minestri address: " + inputAddressMinestry.value);
			contract.methods.addMinestry(inputAddressMinestry.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result);
					$("#allertAddMinestry").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction executed!</strong>\nID transaction: ' + result + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});
			inputAddressMinestry.value = '';
		}
		else {
			inputAddressMinestry.value = '';
			$("#allertAddMinestry").html('<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry" role="alert">Address MINESTRY must start with \'0x\'<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			setTimeout(function () { $("#allertMinestry").remove(); }, 10000);
		}
	}
	//ADD HUB
	document.getElementById("buttonAddressHub").addEventListener('click', addHub);
	var inputAddressHub = document.getElementById("inputAddressHub")

	async function addHub() {
		if (inputAddressHub.value.startsWith("0x")) {
			console.log("MyAddress: " + ethereum.selectedAddress);
			console.log("Hub address: " + inputAddressMinestry.value);
			contract.methods.addHub(inputAddressHub.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result);
					$("#allertAddMinestry").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction executed!</strong>\nID transaction: ' + result + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});
			inputAddressHub.value = '';
		}
		else {
			inputAddressHub.value = '';
			$("#allertAddHub").html('<div class="alert alert-danger alert-dismissible fade show" id="allertHub" role="alert">Address HUB must start with \'0x\'<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertHub").remove(); }, 10000);
		}
	}

	//ADD USER
	var hashDocumentID_user;
	document.getElementById('documentUploadButton').addEventListener('click', hashFileIDUser);
	async function hashFileIDUser() {
		let name = $('#inputDocumentIDUser')[0].name
		if ($('#inputDocumentIDUser')[0].files.length == 0) {
			return showError("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_user = "0x" + shaObj.getHash("HEX");
			console.log(hashDocumentID_user);
			try {
				$("#hashDocumentIDUser").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>' + hashDocumentID_user + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentIDUser')[0].files[0]);
	}

	document.getElementById("buttonAddUser").addEventListener('click', addUser);
	var inputAddUser = document.getElementById("inputAddUser")

	async function addUser() {
		if (inputAddUser.value == "0x") {
			inputAddUser.value = '';
			console.log("ID " + hashDocumentID_user);
			$("#allertAddUser").html('<div class="alert alert-success alert-dismissible fade show" id="allertUser" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertUser").remove(); }, 10000);
		}
		else {
			inputAddUser.value = '';
			$("#allertAddUser").html('<div class="alert alert-danger alert-dismissible fade show" id="allertUser" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertUser").remove(); }, 10000);
		}
	}

	//TEST PUBLISH
	let hashDocumentID_testP;
	let hashDocument_testP;
	let positivity_testP;
	document.getElementById('butUploadDocIDTest').addEventListener('click', hashFileIDTest);
	async function hashFileIDTest() {
		if ($('#inputTestDocumentID')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_testP = "0x" + shaObj.getHash("HEX");
			console.log("ID  " + hashDocumentID_testP);
			try {
				$("#hashDocumentIDTest").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong>Hash document is: </strong>' + hashDocumentID_testP + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputTestDocumentID')[0].files[0]);

	}

	document.getElementById('butUploadDocTest').addEventListener('click', hashFileTest);
	async function hashFileTest() {
		if ($('#inputTestDocument')[0].files.length == 0) {
			return showError("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocument_testP = "0x" + shaObj.getHash("HEX");
			console.log("TEST  " + hashDocument_testP);
			try {
				$("#hashDocumentTest").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong>Hash document is: </strong>' + hashDocument_testP + '</div>');
			} catch (error) {
				console.log(error)
			}
		}
		reader.readAsArrayBuffer($('#inputTestDocument')[0].files[0]);

	}

	document.getElementById("buttonTestPublish").addEventListener('click', testPublish);
	var inputTestPublish = document.getElementById("inputTestPublish")
	async function testPublish() {
		if (inputTestPublish.value == "0x") {
			inputTestPublish.value = '';
			console.log("ID " + hashDocumentID_testP);
			console.log("TEst " + hashDocument_testP);
			//selector
			positivity = document.getElementById("inputPosivity").value;
			console.log(positivity);
			$("#allertTestPublish").html('<div class="alert alert-success alert-dismissible fade show" id="allertTest" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			$("#inputPosivity").get(0).selectedIndex = 0;
			//setTimeout(function () { $("#allertTest").remove(); }, 10000);
		}
		else {
			inputTestPublish.value = '';
			$("#allertTestPublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertTest" role="alert"><strong>Transaction NOT executed!</strong>  <button type="button" class="close" data-dismiss="alert" aria-label="Close">   </button></div></div>');
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertTest").remove(); }, 10000);

		}
	}


	//VACCINE PUBLISH
	var hashDocumentID_vaccineP;
	var hashDocument_vaccineP;
	document.getElementById('butUploadDocIDVaccine').addEventListener('click', hashFileIDVaccine);
	async function hashFileIDVaccine() {
		if ($('#inputDocumentIDVaccine')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_vaccineP = "0x" + shaObj.getHash("HEX");
			console.log(hashDocumentID_vaccineP);
			try {
				$("#hashDocumentIDVaccine").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>' + hashDocumentID_vaccineP + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentIDVaccine')[0].files[0]);
	}

	document.getElementById('butUploadDocVaccine').addEventListener('click', hashFileVaccine);
	async function hashFileVaccine() {
		if ($('#inputDocumentVaccine')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {

			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocument_vaccineP = "0x" + shaObj.getHash("HEX");
			console.log(hashDocument_vaccineP);
			try {
				$("#hashDocumentVaccine").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>' + hashDocument_vaccineP + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccine')[0].files[0]);

	}

	document.getElementById("buttonVaccinePublish").addEventListener('click', vaccinePublish);
	var inputAddressUserVaccine = document.getElementById("inputAddressUserVaccine")
	async function vaccinePublish() {
		if (inputAddressUserVaccine.value == "0x") {
			inputAddressUserVaccine.value = '';
			console.log("ID " + hashDocumentID_vaccineP);
			console.log("TEst " + hashDocument_vaccineP);
			$("#allertVaccinePublish").html('<div class="alert alert-success alert-dismissible fade show" id="allertVaccine" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
		else {
			inputAddressUserVaccine.value = '';
			const stringa = "dsfkjsndiuvsdiuv idsunfcsdiau \n\n <p>dsinfsdin\n\n\t sdnv\t</p>";
			$("#allertVaccinePublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertVaccine" role="alert"><strong>Transaction NOT executed!</strong> ' + stringa + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
	}

	//TEST VERIFICATION
	let hashDocumentID_testV;
	let hashDocument_testV;
	document.getElementById('butUploadDocIDTestVer').addEventListener('click', hashFileIDTestVer);
	async function hashFileIDTestVer() {
		if ($('#inputTestVerDocumentID')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_testV = "0x" + shaObj.getHash("HEX");
			console.log("ID  " + hashDocumentID_testV);
			try {
				$("#hashDocumentIDTestVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong>Hash document is: </strong>' + hashDocumentID_testV + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputTestVerDocumentID')[0].files[0]);

	}

	document.getElementById('butUploadDocTestVer').addEventListener('click', hashFileTestVer);
	async function hashFileTestVer() {
		if ($('#inputTestVerDocument')[0].files.length == 0) {
			return showError("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocument_testV = "0x" + shaObj.getHash("HEX");
			console.log("TEST  " + hashDocument_testV);
			try {
				$("#hashDocumentTestVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><strong>Hash document is: </strong>' + hashDocument_testV + '</div>');
			} catch (error) {
				console.log(error)
			}
		}
		reader.readAsArrayBuffer($('#inputTestVerDocument')[0].files[0]);

	}

	document.getElementById("buttonTestVerification").addEventListener('click', testPublishVer);
	var inputTestVerification = document.getElementById("inputTestVerification")
	async function testPublishVer() {
		if (inputTestVerification.value == "0x") {
			inputTestVerification.value = '';
			console.log("ID " + hashDocumentID_testV);
			console.log("TEst " + hashDocument_testV);
			$("#allertTestVer").html('<div class="alert alert-success alert-dismissible fade show" id="allertVerification" role="alert"><strong>Verification CORRECT!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertVerification").remove(); }, 10000);
		}
		else {
			inputTestVerification.value = '';
			$("#allertTestVer").html('<div class="alert alert-danger alert-dismissible fade show" id="allertVerification" role="alert"><strong>Verification NOT CORRECT!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span>  </button></div></div>');
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertVerification").remove(); }, 10000);

		}
	}

	//VACCINE VERIFICATION
	var hashDocumentID_vaccineV;
	var hashDocument_vaccineV;
	document.getElementById('butUploadDocIDVaccineVer').addEventListener('click', hashFileIDVaccineVer);
	async function hashFileIDVaccineVer() {
		if ($('#inputDocumentIDVaccineVer')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_vaccineV = "0x" + shaObj.getHash("HEX");
			console.log(hashDocumentID_vaccineV);
			try {
				$("#hashDocumentIDVaccineVer").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>' + hashDocumentID_vaccineV + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentIDVaccineVer')[0].files[0]);
	}

	document.getElementById('butUploadDocVaccineVer').addEventListener('click', hashFileVaccineVer);
	async function hashFileVaccineVer() {
		if ($('#inputDocumentVaccineVer')[0].files.length == 0) {
			return console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = function () {

			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocument_vaccineV = "0x" + shaObj.getHash("HEX");
			console.log(hashDocument_vaccineV);
			try {
				$("#hashDocumentVaccineVer").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>' + hashDocument_vaccineV + '</div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccineVer')[0].files[0]);

	}

	document.getElementById("buttonVaccineVerification").addEventListener('click', vaccinePublishVer);
	var inputAddressUserVaccineVer = document.getElementById("inputAddressUserVaccineVer")
	async function vaccinePublishVer() {
		if (inputAddressUserVaccineVer.value == "0x") {
			inputAddressUserVaccineVer.value = '';
			console.log("ID " + hashDocumentID_vaccineV);
			console.log("TEst " + hashDocument_vaccineV);
			$("#allertVaccineVerification").html('<div class="alert alert-success alert-dismissible fade show" id="allertVaccineVer" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
		else {
			inputAddressUserVaccineVer.value = '';
			$("#allertVaccineVerification").html('<div class="alert alert-danger alert-dismissible fade show" id="allertVaccineVer" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
	}





});
