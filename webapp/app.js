console.log("HELLO");
var contract_address = "0x4485B3A70c19938447A0DfD0547DF2282bc95493";
var web3;
var contract;



window.addEventListener('load', init);
async function init() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		web3 = new Web3(window.ethereum);
	} else {
		console.log('Injected web3 Not Found!!!')
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

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
					$("#allertAddMinestry").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});
			inputAddressMinestry.value = '';
		}
		else {
			inputAddressMinestry.value = '';
			$("#allertAddMinestry").html('<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address MINESTRY must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			setTimeout(function () { $("#allertMinestry").remove(); }, 10000);
		}
	}
	//ADD HUB
	document.getElementById("buttonAddressHub").addEventListener('click', addHub);
	var inputAddressHub = document.getElementById("inputAddressHub")

	async function addHub() {
		if (inputAddressHub.value.startsWith("0x")) {
			console.log("MyAddress: " + ethereum.selectedAddress);
			console.log("Hub address: " + inputAddressHub.value);

			contract.methods.addHub(inputAddressHub.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result);
					$("#allertAddHub").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});

			//const result = '0x398da999afbef4892a62141ba76998efdf18db4fe561d7024c763e9c477d0225';
			//$("#allertAddHub").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

			inputAddressHub.value = '';
		}
		else {
			inputAddressHub.value = '';
			$("#allertAddHub").html('<div class="alert alert-danger alert-dismissible fade show" id="allertHub" role="alert><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address HUB must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertHub").remove(); }, 10000);
		}
	}

	//TEST PUBLISH
	let hashDocumentID_testP;
	let hashDocument_testP;
	let boolDocIDTestP = false;
	let boolDocTestP = false;
	document.getElementById('butUploadDocIDTest').addEventListener('click', hashFileIDTest);
	async function hashFileIDTest() {
		if ($('#inputTestDocumentID')[0].files.length == 0) {
			return showError("No file inserted");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_testP = "0x" + shaObj.getHash("HEX");
			console.log("ID  " + hashDocumentID_testP);
			boolDocIDTestP = true;
			console.log("boolDocIDTestP: " + boolDocIDTestP);
			try {
				$("#hashDocumentIDTest").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_testP + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputTestDocumentID')[0].files[0]);


	}

	document.getElementById('butUploadDocTest').addEventListener('click', hashFileTest);
	async function hashFileTest() {
		if ($('#inputTestDocument')[0].files.length == 0) {
			return showError("No file inserted");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocument_testP = "0x" + shaObj.getHash("HEX");
			boolDocTestP = true;
			console.log("boolDocTestP: " + boolDocTestP);
			console.log("TEST  " + hashDocument_testP);
			try {
				$("#hashDocumentTest").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_testP + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			} catch (error) {
				console.log(error)
			}
		}
		reader.readAsArrayBuffer($('#inputTestDocument')[0].files[0]);

	}

	document.getElementById("buttonTestPublish").addEventListener('click', testPublish);
	var inputTestPublish = document.getElementById("inputTestPublish")
	async function testPublish() {
		var positivity = document.getElementById("inputPosivity").value;
		if (inputTestPublish.value.startsWith("0x") && boolDocIDTestP && boolDocTestP && positivity != '') {
			console.log("boolDocTestP: " + boolDocTestP)
			console.log("boolDocIDTestP: " + boolDocIDTestP)
			console.log("hsh ID " + hashDocumentID_testP);
			console.log("hash TEst " + hashDocument_testP);
			console.log("Resu " + positivity);
			console.log("address " + inputTestPublish);

			contract.methods.approveTest(hashDocumentID_testP, hashDocument_testP, positivity, inputTestPublish.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result);
					$("#allertTestPublish").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});

			//prova
			//var result = 'dspunfvsdpoivnwoivfewhvnourvnoiranfvdfjbindfboijreajbvmeràoinboreijb';
			//$("#allertTestPublish").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			$("#inputPosivity").get(0).selectedIndex = 0;
			positivity = '';
			inputTestPublish.value = '';
			boolDocIDTestP = false;
			boolDocTestP = false;
			console.log("boolDocTestP: " + boolDocTestP)
			console.log("boolDocIDTestP: " + boolDocIDTestP)
			//setTimeout(function () { $("#allertTest").remove(); }, 10000);
		}
		else {
			inputTestPublish.value = '';
			$("#allertTestPublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertTest" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Some errore in input</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">   </button></div></div>');
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertTest").remove(); }, 10000);

		}
	}


	//VACCINE PUBLISH
	var hashDocumentID_vaccineP;
	var hashDocument_vaccineP;
	let boolDocIDVaccineP = false;
	let boolDocVaccineP = false;
	document.getElementById('butUploadDocIDVaccine').addEventListener('click', hashFileIDVaccine);
	async function hashFileIDVaccine() {
		if ($('#inputDocumentIDVaccine')[0].files.length == 0) {
			return showError("No file inserted");
		}
		var reader = new FileReader();
		reader.onload = function () {
			let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(reader.result);
			hashDocumentID_vaccineP = "0x" + shaObj.getHash("HEX");
			console.log(hashDocumentID_vaccineP);
			boolDocIDVaccineP = true;
			console.log("boolDocIDVaccineP " + boolDocIDVaccineP);
			try {
				$("#hashDocumentIDVaccine").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_vaccineP + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
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
			boolDocVaccineP = true;
			console.log("boolDocVaccineP " + boolDocVaccineP);
			console.log("boolDocIDVaccineP " + boolDocIDVaccineP);

			try {
				$("#hashDocumentVaccine").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_vaccineP + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccine')[0].files[0]);

	}

	document.getElementById("buttonVaccinePublish").addEventListener('click', vaccinePublish);
	var inputAddressUserVaccine = document.getElementById("inputAddressUserVaccine")
	async function vaccinePublish() {
		if (inputAddressUserVaccine.value.startsWith("0x") && boolDocIDVaccineP && boolDocVaccineP) {
			console.log("ID " + hashDocumentID_vaccineP);
			console.log("Vacc " + hashDocument_vaccineP);
			console.log("boolDocVaccineP " + boolDocVaccineP);
			console.log("boolDocIDVaccineP " + boolDocIDVaccineP);
			console.log("Address " + inputAddressUserVaccine.value);

			contract.methods.approveVaccine(hashDocumentID_vaccineP, hashDocument_vaccineP, inputAddressUserVaccine.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result);
					$("#allertVaccinePublish").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
				}
			});


			//prova
			//var result = 'dspunfvsdpoivnwoivfewhvnourvnoiranfvdfjbindfboijreajbvmeràoinboreijb';
			//$("#allertVaccinePublish").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Transaction executed!</strong><br>ID transaction: ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

			boolDocVaccineP = false;
			boolDocIDVaccineP = false;
			console.log("boolDocVaccineP set " + boolDocVaccineP);
			console.log("boolDocIDVaccineP set" + boolDocIDVaccineP);
			inputAddressUserVaccine.value = '';
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
		else {
			//prova
			const stringa = "dsfkjsndiuvsdiuv idsunfcsdiau \n\n <p>dsinfsdin\n\n\t sdnv\t</p>";
			$("#allertVaccinePublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertVaccine" role="alert"><strong>Transaction NOT executed!</strong> ' + stringa + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			inputAddressUserVaccine.value = '';
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
	}

	//TEST VERIFICATION
	let hashDocumentID_testV;
	let hashDocument_testV;
	let boolDocIDTestV = false;
	let boolDocTestV = false;
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
			boolDocIDTestV = true;
			console.log("boolDocIDTestV " + boolDocIDTestV);
			try {
				$("#hashDocumentIDTestVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_testV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
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
			boolDocTestV = true;
			console.log("boolDocIDTestV " + boolDocIDTestV);
			try {
				$("#hashDocumentTestVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_testV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			} catch (error) {
				console.log(error)
			}
		}
		reader.readAsArrayBuffer($('#inputTestVerDocument')[0].files[0]);

	}

	document.getElementById("buttonTestVerification").addEventListener('click', testPublishVer);
	var inputTestVerification = document.getElementById("inputTestVerification")
	async function testPublishVer() {
		if (inputTestVerification.value.startsWith("0x") && boolDocIDTestV && boolDocTestV) {

			console.log("ID " + hashDocumentID_testV);
			console.log("TEst " + hashDocument_testV);
			console.log("address " + inputTestVerification.value);
			console.log("boolDocIDTestV " + boolDocIDTestV);
			console.log("boolDocTestV  " + boolDocTestV);

			//bisogna restituire in base al rusiltato un diverso colore di allert

			contract.methods.verificationTest(hashDocumentID_testV, hashDocument_testV, inputTestVerification.value).call((error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result[0]);
					console.log("RESULT: " + result[1]);
					console.log("RESULT: " + result[2]);
					if (result[0]) {
						$("#allertTestVer").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>FIND TEST RESULT!</strong><br>Time block executed: ' + result[1] + '<br> Result positivity test: ' + result[2] + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					} else {
						$("#allertTestVer").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>NO TEST FIND!</strong><br>' + result[0] + '  ' + result[1] + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

					}
				}
			});


			//prova
			//var result = 'dspunfvsdpoivnwoivfewhvnourvnoiranfvdfjbindfboijreajbvmeràoinboreijb';
			//$("#allertTestVer").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>RESULT!</strong><br> ' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

			boolDocIDTestV = false;
			boolDocTestV = false;
			console.log("boolDocIDTestV set " + boolDocIDTestV);
			console.log("TEST  set " + boolDocTestV);
			//setTimeout(function () { $("#allertVerification").remove(); }, 10000);
			//inputTestVerification.value = '';
		}
		else {
			const stringa = "dsfkjsndiuvsdiuv idsunfcsdiau \n\n <p>dsinfsdin\n\n\t sdnv\t</p>";
			$("#allertTestVer").html('<div class="alert alert-danger alert-dismissible fade show" id="allertVaccine" role="alert"><strong>ERROR INPUT!</strong> ' + stringa + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			inputTestVerification.value = '';
			// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
			//setTimeout(function () { $("#allertVerification").remove(); }, 10000);

		}
	}

	//VACCINE VERIFICATION
	var hashDocumentID_vaccineV;
	var hashDocument_vaccineV;
	let boolDocIDVaccineV = false;
	let boolDocVaccineV = false;
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
			boolDocIDVaccineV = true;
			console.log("boolDocIDVaccineV " + boolDocIDVaccineV);
			try {
				$("#hashDocumentIDVaccineVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_vaccineV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
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
			boolDocVaccineV = true;
			console.log("boolDocVaccineV " + boolDocVaccineV);
			try {
				$("#hashDocumentVaccineVer").html('<div class="alert alert-primary alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_vaccineV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			} catch (error) {
				console.log(error);
			}
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccineVer')[0].files[0]);

	}

	document.getElementById("buttonVaccineVerification").addEventListener('click', vaccinePublishVer);
	var inputAddressUserVaccineVer = document.getElementById("inputAddressUserVaccineVer")
	async function vaccinePublishVer() {
		if (inputAddressUserVaccineVer.value.startsWith("0x") && boolDocIDVaccineV && boolDocVaccineV) {

			console.log("ID " + hashDocumentID_vaccineV);
			console.log("TEst " + hashDocument_vaccineV);
			console.log("address " + inputAddressUserVaccineVer.value);
			console.log("boolDocVaccineV " + boolDocVaccineV);
			console.log("boolDocIDVaccineV " + boolDocIDVaccineV);
			//bisogna restituire in base al rusiltato un diverso colore di allert

			contract.methods.verificationVaccine(hashDocumentID_vaccineV, hashDocument_vaccineV, inputAddressUserVaccineVer.value).call((error, result) => {
				if (error) { console.log(error) }
				else {
					console.log("RESULT: " + result[0]);
					console.log("RESULT: " + result[1]);
					if (result[0]) {
						$("#allertVaccineVerification").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>VACCINE CERTIFICATE FIND!</strong><br>Time block mined: ' + result[1] + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					} else {
						$("#allertVaccineVerification").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>NO VACCINE CERTIFICATE FIND!</strong><br></p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					}
				}
			});

			//prova
			//var result = 'dspunfvsdpoivnwoivfewhvnourvnoiranfvdfjbindfboijreajbvmeràoinboreijb';
			//$("#allertVaccineVerification").html('<div class="alert alert-success alert-dismissible fade show" role="alert"><p style="word-break: break-all;"><strong>RESULT!</strong><br>' + result + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

			boolDocVaccineV = false;
			boolDocIDVaccineV = false;
			console.log("ID set " + boolDocVaccineV);
			console.log("TEst set " + boolDocIDVaccineV);
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
			inputAddressUserVaccineVer.value = '';
		}
		else {
			const stringa = "dsfkjsndiuvsdiuv idsunfcsdiau \n\n <p>dsinfsdin\n\n\t sdnv\t</p>";
			$("#allertVaccineVerification").html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>ERROR INPUT! executed!</strong> ' + stringa + '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

			//inputAddressUserVaccineVer.value = '';
			//setTimeout(function () { $("#allertVaccine").remove(); }, 10000);
		}
	}





});
