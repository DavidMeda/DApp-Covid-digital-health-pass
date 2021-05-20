var web3;
var contract;
var ipfs;


function timeConverter(UNIX_timestamp) {
	var dateObject = new Date(UNIX_timestamp * 1000);
	return dateObject.toLocaleString('en-GB');
}

async function sendIpfs(buffer) {
	//console.log("Submitting file to ipfs...");
	const res = await ipfs.add(buffer);
	//console.log(res);
	return res;
}

function calculateHash(file) {
	let shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
	shaObj.update(file);
	return "0x" + shaObj.getHash("HEX");
}


window.addEventListener('load', init);
async function init() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		//console.log("WEB3 found!");
		web3 = new Web3(window.ethereum);
	} else {
		//console.log('Injected web3 Not Found!!!')
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7585'));
	}

	if (window.ethereum) {
		try {
			await ethereum.enable();
		} catch (err) {
			allert("Access to your Ethereum account rejected." + error);
		}
	}

	const MyContract = await $.getJSON("Vendor/Covid.json");
	const networkId = await web3.eth.net.getId();
	const deployedNetwork = MyContract.networks[networkId];
	contract = new web3.eth.Contract(
		MyContract.abi,
		deployedNetwork && deployedNetwork.address,
	);
	//console.log("deployedNetwork.address " + deployedNetwork.address);

	$('#AddressContract').html('<strong>Contract address on Ropsten testnet : ' + deployedNetwork.address + '</strong>');
	$('#AddressAccount').html('<strong>Your address is: ' + ethereum.selectedAddress + '</strong>');
	ipfs = new IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

}


$('document').ready(function () {

	//ADD MINISTRY
	document.getElementById("buttonAddressMinistry").addEventListener('click', addMinistry);
	const inputAddressMinistry = document.getElementById("inputAddressMinistry")

	async function addMinistry() {
		if (inputAddressMinistry.value.startsWith("0x")) {

			//console.log("MyAddress: " + ethereum.selectedAddress);
			//console.log("Ministry address: " + inputAddressMinistry.value);
			contract.methods.addMinistry(inputAddressMinistry.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertAddMinistry').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.newMinistry()
						.on('data', (event) => {
							//console.log("EVENT obj: " + event);
							const blockNumber = event["blockNumber"];
							const from = event["returnValues"]["from"];
							const newMinistry = event["returnValues"]["ministryAddress"];
							const time = timeConverter(event["returnValues"]["time"]);
							const stringa = '<strong><br>ID transaction: </strong>' + result + '<strong><br>block Number: </strong>' + blockNumber + '<strong><br>Mined at: </strong>' + time + '<strong><br>From address: </strong>' + from + '<strong><br>Ministry address: </strong>' + newMinistry;
							$("#allertAddMinistry").html('<div class="alert alert-success alert-dismissible fade show" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');

						}).on('error', console.error);
					inputAddressMinistry.value = '';
				}

			});

		}
		else {
			$("#allertAddMinistry").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address MINISTRY must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
		}
	}

	//REMOVE MINISTRY
	document.getElementById("buttonAddressMinistry2").addEventListener('click', removeMinistry);
	const inputAddressMinistryR = document.getElementById("inputAddressMinistry2")

	async function removeMinistry() {
		if (inputAddressMinistryR.value.startsWith("0x")) {

			//console.log("MyAddress: " + ethereum.selectedAddress);
			//console.log("Ministry address: " + inputAddressMinistryR.value);
			contract.methods.removeMinistry(inputAddressMinistryR.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertRemoveMinistry').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.deletedMinistry()
						.on('data', (event) => {
							//console.log(event);
							const blockNumber = event["blockNumber"];
							const from = event["returnValues"]["from"];
							const newMinistry = event["returnValues"]["ministryAddres"];
							const time = timeConverter(event["returnValues"]["time"]);
							const stringa = '<strong><br>ID transaction: </strong>' + result + '<strong><br>block Number: </strong>' + blockNumber + '<strong><br>Mined at: </strong>' + time + '<strong><br>From address: </strong>' + from + '<strong><br>Ministry address: </strong>' + newMinistry;
							$("#allertRemoveMinistry").html('<div class="alert alert-success alert-dismissible fade show" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
						}).on('error', console.error);
					inputAddressMinistryR.value = '';
				}
			});
		}
		else {
			$("#allertRemoveMinistry").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address MINISTRY must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);

		}
	}


	//ADD HUB
	document.getElementById("buttonAddressHub").addEventListener('click', addHub);
	var inputAddressHub = document.getElementById("inputAddressHub")

	async function addHub() {
		if (inputAddressHub.value.startsWith("0x")) {
			//console.log("MyAddress: " + ethereum.selectedAddress);
			//console.log("Hub address: " + inputAddressHub.value);

			contract.methods.addHub(inputAddressHub.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertAddHub').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.newHub()
						.on('data', (event) => {
							//console.log(event);
							const blockNumber = event["blockNumber"];
							const from = event["returnValues"]["from"];
							const hubAddress = event["returnValues"]["hubAddress"];
							const time = timeConverter(event["returnValues"]["time"]);
							const stringa = '<br><strong>ID transaction: </strong>' + result + '<br><strong>Block Number: </strong>' + blockNumber + '<br><strong>Mined at: </strong>' + time + '<br><strong>From address: </strong>' + from + '<br><strong>Ministry address: </strong>' + hubAddress;
							$("#allertAddHub").html('<div class="alert alert-success alert-dismissible fade show"  role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
							inputAddressHub.value = '';
						}).on('error', console.error);
				}
			});
		}
		else {
			inputAddressHub.value = '';
			$("#allertAddHub").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address HUB must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
		}
	}

	//REMOVE HUB
	document.getElementById("buttonAddressHub2").addEventListener('click', removeHub);
	var inputAddressHubR = document.getElementById("inputAddressHub2")

	async function removeHub() {
		if (inputAddressHubR.value.startsWith("0x")) {
			//console.log("MyAddress: " + ethereum.selectedAddress);
			//console.log("Hub address: " + inputAddressHubR.value);

			contract.methods.removeHub(inputAddressHubR.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertRemoveHub').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.deletedHub()
						.on('data', (event) => {
							//console.log(event);
							const blockNumber = event["blockNumber"];
							const from = event["returnValues"]["from"];
							const hubAddress = event["returnValues"]["hubAddres"];
							const time = timeConverter(event["returnValues"]["time"]);
							const stringa = '<br><strong>ID transaction: </strong>' + result + '<br><strong>Block Number: </strong>' + blockNumber + '<br><strong>Mined at: </strong>' + time + '<br><strong>From address: </strong>' + from + '<br><strong>Ministry address: </strong>' + hubAddress;
							$("#allertRemoveHub").html('<div class="alert alert-success alert-dismissible fade show"  role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
							inputAddressHubR.value = '';
						}).on('error', console.error);
				}
			});
		}
		else {
			$("#allertRemoveHub").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert><p style="word-break: break-all;"><strong>ERROR!</strong><br>Address HUB must start with \'0x\'</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
		}
	}

	//TEST PUBLISH
	let hashDocumentID_testP;
	let hashDocument_testP;
	let boolDocIDTestP = false;
	let boolDocTestP = false;
	document.getElementById('butUploadDocIDTest').addEventListener('click', async () => {
		if ($('#inputTestDocumentID')[0].files.length == 0) {
			$("#hashDocumentIDTest").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>ERROR!<br>NO file added </strong></p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
			return //console.log("No file added");
		}
		let nameFile = $('#inputTestDocumentID')[0].files[0].name;
		var reader = new FileReader();
		reader.onload = async function () {

			// const res = await sendIpfs(reader.result);
			// //console.log(res["path"]);

			hashDocumentID_testP = calculateHash(reader.result);
			//console.log("ID  " + hashDocumentID_testP);

			boolDocIDTestP = true;
			//console.log("boolDocIDTestP: " + boolDocIDTestP);

			// const link = "https://ipfs.io/ipfs/" + res["path"];
			// const linkHtml = '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>'
			const inner = '<strong>Hash document is: </strong>' + hashDocumentID_testP;
			$("#hashDocumentIDTest").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputTestDocumentID')[0].files[0]);

	});


	document.getElementById('butUploadDocTest').addEventListener('click', async () => {
		if ($('#inputTestDocument')[0].files.length == 0) {
			$("#hashDocumentTest").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>ERROR!<br>NO file added </strong></p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
			return //console.log("No file added");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			let path;
			if (document.getElementById('ipfsTest').checked) {
				$('#hashDocumentTest').html('<div class="alert alert-secondary"  role="allert" ><p "><strong>Upload to IPFS...</strong><br></p></div>');
				const res = await sendIpfs(reader.result);
				path = res["path"];
				//console.log(res["path"]);
			}

			hashDocument_testP = calculateHash(reader.result);
			boolDocTestP = true;
			//console.log("boolDocTestP: " + boolDocTestP);
			//console.log("TEST  " + hashDocument_testP);

			let inner = '<strong>Hash document is: </strong>' + hashDocument_testP;
			if (document.getElementById('ipfsTest').checked == true) {
				const link = "https://ipfs.io/ipfs/" + path;
				inner = inner + '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>';
				document.getElementById('ipfsTest').checked = false;
			}
			$("#hashDocumentTest").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputTestDocument')[0].files[0]);

	});

	document.getElementById("buttonTestPublish").addEventListener('click', testPublish);
	var inputTestPublish = document.getElementById("inputTestPublish")
	async function testPublish() {
		var positivity = document.getElementById("inputPosivity").value;
		if (inputTestPublish.value.startsWith("0x") && boolDocIDTestP && boolDocTestP && positivity != '') {
			//console.log("boolDocTestP: " + boolDocTestP)
			//console.log("boolDocIDTestP: " + boolDocIDTestP)
			//console.log("hsh ID " + hashDocumentID_testP);
			//console.log("hash TEst " + hashDocument_testP);
			//console.log("Resu " + positivity);
			//console.log("address " + inputTestPublish);

			contract.methods.approveTest(hashDocumentID_testP, hashDocument_testP, positivity, inputTestPublish.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log("FAIL: " + error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertTestPublish').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.testPublish().on('data', (event) => {
						//console.log(event);
						const blockNumber = event["blockNumber"];
						const from = event["returnValues"]["from"];
						const user = event["returnValues"]["user"];
						const time = timeConverter(event["returnValues"]["time"]);
						let positivityResult;
						if (event["returnValues"]["positivity"]) { positivityResult = 'POSITIVE' }
						else { positivityResult = 'NEGATIVE' };
						const hashDocument = event["returnValues"]["hashTest"];
						const stringa = '<br><strong>ID transaction: </strong>' + result + '<br><strong>Block Number: </strong>' + blockNumber + '<br><strong>Mined at: </strong>' + time + '<br><strong>From Hub address: </strong>' + from + '<br><strong>User address: </strong>' + user + '<br><strong>Result test: </strong>' + positivityResult + '<br><strong>Hash document test: </strong>' + hashDocument;
						$("#allertTestPublish").html('<div class="alert alert-success alert-dismissible fade show" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
						inputTestPublish.value = '';
						$("#inputPosivity").get(0).selectedIndex = 0;
					}).on('error', console.error);
				}
			});
			positivity = '';
			boolDocIDTestP = false;
			boolDocTestP = false;
			//console.log("boolDocTestP: " + boolDocTestP)
			//console.log("boolDocIDTestP: " + boolDocIDTestP)
			////setTimeout(function () { $("#allertTest").remove(); }, 10000);
		}
		else {
			// inputTestPublish.value = '';
			$("#allertTestPublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertTest" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Some errore in input</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">   </button></div></div>');
			////setTimeout(function () { $("#allertTest").remove(); }, 10000);

		}
	}


	//VACCINE PUBLISH
	var hashDocumentID_vaccineP;
	var hashDocument_vaccineP;
	let boolDocIDVaccineP = false;
	let boolDocVaccineP = false;
	document.getElementById('butUploadDocIDVaccine').addEventListener('click', async () => {
		if ($('#inputDocumentIDVaccine')[0].files.length == 0) {
			$("#hashDocumentIDVaccine").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p><strong>ERROR!</strong><br>NO file added </p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
			return //console.log("No file inserted");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			// const res = await sendIpfs(reader.result);
			// //console.log(res["path"]);

			hashDocumentID_vaccineP = calculateHash(reader.result);
			//console.log(hashDocumentID_vaccineP);
			boolDocIDVaccineP = true;
			//console.log("boolDocIDVaccineP " + boolDocIDVaccineP);
			// const link = "https://ipfs.io/ipfs/" + res["path"];
			// const linkHtml = + '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>';
			const inner = '<strong>Hash document is: </strong>' + hashDocumentID_vaccineP;
			$("#hashDocumentIDVaccine").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputDocumentIDVaccine')[0].files[0]);
	});

	document.getElementById('butUploadDocVaccine').addEventListener('click', async () => {
		if ($('#inputDocumentVaccine')[0].files.length == 0) {
			$("#hashDocumentVaccine").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p><strong>ERROR!</strong><br>NO file added </p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
			return //console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			let path;
			if (document.getElementById('ipfsVaccine').checked) {
				$('#hashDocumentVaccine').html('<div class="alert alert-secondary"role="allert"><p><strong>Upload to IPFS...</strong><br></p></div>');
				const res = await sendIpfs(reader.result);
				path = res["path"];
				//console.log(res["path"]);
			}

			hashDocument_vaccineP = calculateHash(reader.result);
			//console.log(hashDocument_vaccineP);
			boolDocVaccineP = true;
			//console.log("boolDocVaccineP " + boolDocVaccineP);
			//console.log("boolDocIDVaccineP " + boolDocIDVaccineP);

			let inner = '<strong>Hash document is: </strong>' + hashDocument_vaccineP;

			if (document.getElementById('ipfsVaccine').checked == true) {
				const link = "https://ipfs.io/ipfs/" + path;
				inner = inner + '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>';
				document.getElementById('ipfsVaccine').checked = false;
			}
			$("#hashDocumentVaccine").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccine')[0].files[0]);
	});

	document.getElementById("buttonVaccinePublish").addEventListener('click', vaccinePublish);
	var inputAddressUserVaccine = document.getElementById("inputAddressUserVaccine")
	async function vaccinePublish() {
		if (inputAddressUserVaccine.value.startsWith("0x") && boolDocIDVaccineP && boolDocVaccineP) {
			//console.log("ID " + hashDocumentID_vaccineP);
			//console.log("Vacc " + hashDocument_vaccineP);
			//console.log("boolDocVaccineP " + boolDocVaccineP);
			//console.log("boolDocIDVaccineP " + boolDocIDVaccineP);
			//console.log("Address " + inputAddressUserVaccine.value);

			contract.methods.approveVaccine(hashDocumentID_vaccineP, hashDocument_vaccineP, inputAddressUserVaccine.value).send({ from: ethereum.selectedAddress }, (error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("Hash transaction: " + result);
					$('#allertVaccinePublish').html('<div class="alert alert-secondary" id="allert" role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>Transaction pending...</strong><br>Follow link to Ethersan: <a href="https://ropsten.etherscan.io/tx/' + result + '" class="alert-link">https://ropsten.etherscan.io/tx/' + result + '</a></br></p></div>');
					contract.events.vaccinePublish().on('data', (event) => {
						//console.log(event);
						const blockNumber = event["blockNumber"];
						const from = event["returnValues"]["from"];
						const user = event["returnValues"]["user"];
						const time = timeConverter(event["returnValues"]["time"]);
						const hashDocument = event["returnValues"]["hashCertificate"];
						const stringa = '<br><strong>ID transaction: </strong>' + result + '<br><strong>Block Number: </strong>' + blockNumber + '<br><strong>Mined at: </strong>' + time + '<br><strong>From Hub address: </strong>' + from + '<br><strong>User address: </strong>' + user + '<br><strong>Hash document test: </strong>' + hashDocument;
						$("#allertVaccinePublish").html('<div class="alert alert-success alert-dismissible fade show"  role="alert" style="padding-left:10px;padding-right:20px"><p style="word-break: break-all;"><strong>TRANSACTION EXECUTED!</strong>' + stringa + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
						inputAddressUserVaccine.value = '';
					}).on('error', console.error);
				}
			});

			boolDocVaccineP = false;
			boolDocIDVaccineP = false;
			//console.log("boolDocVaccineP set " + boolDocVaccineP);
			//console.log("boolDocIDVaccineP set" + boolDocIDVaccineP);
		}
		else {
			$("#allertVaccinePublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>ERROR!</strong><br>Some errore in input</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
		}
	}

	//TEST VERIFICATION
	let hashDocumentID_testV;
	let hashDocument_testV;
	let boolDocIDTestV = false;
	let boolDocTestV = false;


	document.getElementById('butUploadDocIDTestVer').addEventListener('click', async () => {
		if ($('#inputTestVerDocumentID')[0].files.length == 0) {
			return //console.log("Insert file");
		}
		else {
			var reader = new FileReader();
			reader.onload = async function () {
				hashDocumentID_testV = calculateHash(reader.result);
				//console.log("ID  " + hashDocumentID_testV);
				boolDocIDTestV = true;
				//console.log("boolDocIDTestV " + boolDocIDTestV);
				$("#hashDocumentIDTestVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_testV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
				//setTimeout(function () { $("#allert").remove(); }, 60000);
			}
			reader.readAsArrayBuffer($('#inputTestVerDocumentID')[0].files[0]);
		}
	});

	document.getElementById('radioTest4').addEventListener('click', () => {

		document.getElementById('butUploadDocTestVer').disabled = true;
		document.getElementById('inputTestVerDocument').disabled = true;
		document.getElementById('URLDocumentTest').disabled = false;
		document.getElementById('butURLDocumentTest').disabled = false;
	});

	document.getElementById('radioTest3').addEventListener('click', () => {
		document.getElementById('butUploadDocTestVer').disabled = false;
		document.getElementById('inputTestVerDocument').disabled = false;
		document.getElementById('URLDocumentTest').disabled = true;
		document.getElementById('butURLDocumentTest').disabled = true;
	});

	document.getElementById('butURLDocumentTest').addEventListener('click', async () => {
		let cid;
		if (URLDocumentTest.value.trim().startsWith("http")) {
			cid = URLDocumentTest.value.trim().substring(21);
			//console.log(typeof cid);
		}
		else {
			cid = URLDocumentTest.value.trim();
		}
		const chunks = []
		for await (const chunk of ipfs.cat(cid)) {
			chunks.push(chunk)
		}
		//console.log(chunks);

		hashDocument_testV = calculateHash(chunks[0]);
		//console.log("ID  " + hashDocument_testV);
		boolDocTestV = true;
		//console.log("boolDocTestV " + boolDocTestV);
		const link = "https://ipfs.io/ipfs/" + URLDocumentTest.value;
		const inner = '<strong>Hash document is: </strong>' + hashDocument_testV + '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>';
		$("#hashDocumentTestVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
		//setTimeout(function () { $("#allert").remove(); }, 60000);
		URLDocumentTest.value = '';
	});


	document.getElementById('butUploadDocTestVer').addEventListener('click', hashFileTestVer);
	async function hashFileTestVer() {
		if ($('#inputTestVerDocument')[0].files.length == 0) {
			return //console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			hashDocument_testV = calculateHash(reader.result);
			//console.log("TEST  " + hashDocument_testV);
			boolDocTestV = true;
			//console.log("boolDocIDTestV " + boolDocIDTestV);
			$("#hashDocumentTestVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_testV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputTestVerDocument')[0].files[0]);
	}

	document.getElementById("buttonTestVerification").addEventListener('click', testPublishVer);
	var inputTestVerification = document.getElementById("inputTestVerification")
	async function testPublishVer() {
		if (inputTestVerification.value.startsWith("0x") && boolDocIDTestV && boolDocTestV) {

			//console.log("ID " + hashDocumentID_testV);
			//console.log("TEst " + hashDocument_testV);
			//console.log("address " + inputTestVerification.value);
			//console.log("boolDocIDTestV " + boolDocIDTestV);
			//console.log("boolDocTestV  " + boolDocTestV);

			//bisogna restituire in base al rusiltato un diverso colore di allert

			contract.methods.verificationTest(hashDocumentID_testV, hashDocument_testV, inputTestVerification.value).call((error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("RESULT: " + result[0]);
					//console.log("RESULT: " + result[1]);
					//console.log("RESULT: " + result[2]);
					let resultPositivity;
					if (result[2]) { resultPositivity = "POSITIVE"; }
					else { resultPositivity = "NEGATIVE"; }
					if (result[0]) {
						$("#allertTestVer").html('<div class="alert alert-success alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>TEST RESULT FIND!</strong><br><strong>Time block mined: </strong>' + timeConverter(result[1]) + '<br> <strong>Result test: </strong>' + resultPositivity + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					} else {
						$("#allertTestVer").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>NO TEST FIND!</strong><br>' + result[0] + '  ' + result[1] + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					}
					inputTestVerification.value = '';
				}
			});
			boolDocIDTestV = false;
			boolDocTestV = false;
			//console.log("boolDocIDTestV set " + boolDocIDTestV);
			//console.log("TEST  set " + boolDocTestV);

		}
		else {
			$("#allertTestVer").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><strong>ERROR!</strong><br>Some errore in input<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
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
			return //console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			hashDocumentID_vaccineV = calculateHash(reader.result);
			//console.log(hashDocumentID_vaccineV);
			boolDocIDVaccineV = true;
			//console.log("boolDocIDVaccineV " + boolDocIDVaccineV);
			$("#hashDocumentIDVaccineVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocumentID_vaccineV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputDocumentIDVaccineVer')[0].files[0]);
	}


	document.getElementById('radioVaccine4').addEventListener('click', () => {

		document.getElementById('butUploadDocVaccineVer').disabled = true;
		document.getElementById('inputDocumentVaccineVer').disabled = true;
		document.getElementById('URLDocumentVaccine').disabled = false;
		document.getElementById('butURLDocumentVaccine').disabled = false;
	});

	document.getElementById('radioVaccine3').addEventListener('click', () => {

		document.getElementById('butUploadDocVaccineVer').disabled = false;
		document.getElementById('inputDocumentVaccineVer').disabled = false;
		document.getElementById('URLDocumentVaccine').disabled = true;
		document.getElementById('butURLDocumentVaccine').disabled = true;
	});

	document.getElementById('butURLDocumentVaccine').addEventListener('click', async () => {
		const chunks = []
		let cid;
		if (URLDocumentVaccine.value.trim().startsWith("http")) {
			cid = URLDocumentVaccine.value.trim().substring(21);
			//console.log(typeof cid);
		}
		else {
			cid = URLDocumentVaccine.value.trim();
		}
		for await (const chunk of ipfs.cat(cid)) {
			chunks.push(chunk)
		}
		//console.log(chunks);

		hashDocument_vaccineV = calculateHash(chunks[0]);
		//console.log("ID  " + hashDocument_vaccineV);
		boolDocVaccineV = true;
		//console.log("boolDocTestV " + boolDocVaccineV);
		const link = "https://ipfs.io/ipfs/" + URLDocumentVaccine.value;
		const inner = '<strong>Hash document is: </strong>' + hashDocument_vaccineV + '<br><strong>IPFS link:</strong> <a href=' + link + '>' + link + '</a>';
		$("#hashDocumentVaccineVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;">' + inner + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
		URLDocumentVaccine.value = '';
		//setTimeout(function () { $("#allert").remove(); }, 60000);
	});

	document.getElementById('butUploadDocVaccineVer').addEventListener('click', hashFileVaccineVer);
	async function hashFileVaccineVer() {
		if ($('#inputDocumentVaccineVer')[0].files.length == 0) {
			return //console.log("Insert file");
		}
		var reader = new FileReader();
		reader.onload = async function () {
			hashDocument_vaccineV = calculateHash(reader.result);
			//console.log(hashDocument_vaccineV);
			boolDocVaccineV = true;
			//console.log("boolDocVaccineV " + boolDocVaccineV);
			$("#hashDocumentVaccineVer").html('<div class="alert alert-primary alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>Hash document is: </strong>' + hashDocument_vaccineV + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div>');
			//setTimeout(function () { $("#allert").remove(); }, 60000);
		}
		reader.readAsArrayBuffer($('#inputDocumentVaccineVer')[0].files[0]);

	}

	document.getElementById("buttonVaccineVerification").addEventListener('click', vaccinePublishVer);
	var inputAddressUserVaccineVer = document.getElementById("inputAddressUserVaccineVer")
	async function vaccinePublishVer() {
		if (inputAddressUserVaccineVer.value.startsWith("0x") && boolDocIDVaccineV && boolDocVaccineV) {

			//console.log("ID " + hashDocumentID_vaccineV);
			//console.log("TEst " + hashDocument_vaccineV);
			//console.log("address " + inputAddressUserVaccineVer.value);
			//console.log("boolDocVaccineV " + boolDocVaccineV);
			//console.log("boolDocIDVaccineV " + boolDocIDVaccineV);

			contract.methods.verificationVaccine(hashDocumentID_vaccineV, hashDocument_vaccineV, inputAddressUserVaccineVer.value).call((error, result) => {
				if (error) { console.log(error) }
				else {
					//console.log("RESULT: " + result[0]);
					//console.log("RESULT: " + result[1]);
					if (result[0]) {
						$("#allertVaccineVerification").html('<div class="alert alert-success alert-dismissible fade show" id="allert role="alert"><p style="word-break: break-all;"><strong>VACCINE CERTIFICATE FIND!</strong><br><strong>Time block mined: </strong>' + timeConverter(result[1]) + '</p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					} else {
						$("#allertVaccineVerification").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><p style="word-break: break-all;"><strong>NO VACCINE CERTIFICATE FIND!</strong><br></p><button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
					}
					inputAddressUserVaccineVer.value = '';
				}
			});
			boolDocVaccineV = false;
			boolDocIDVaccineV = false;
			//console.log("ID set " + boolDocVaccineV);
			//console.log("TEst set " + boolDocIDVaccineV);

		}
		else {
			$("#allertVaccineVerification").html('<div class="alert alert-danger alert-dismissible fade show" id="allert" role="alert"><strong>ERROR!</strong><br>Some errore in input<button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
			//setTimeout(function () { $("#allert").remove(); }, 10000);
		}
	}






});
