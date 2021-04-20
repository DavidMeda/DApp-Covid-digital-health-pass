
console.log("HELLO");


$('document').ready(function(){

//ADD MINESTRY
document.getElementById("buttonAddressMinestry").onclick = function() {addMinestry()};
var inputAddressMinestry = document.getElementById("inputAddressMinestry")

async function addMinestry() {
  if (inputAddressMinestry.value == "0x"){
  	inputAddressMinestry.value = '';
  	$("#allertAddMinestry").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertMinestry").remove();}, 10000);
  }
  else{
  	inputAddressMinestry.value = '';
  	$("#allertAddMinestry").html('<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertMinestry").remove();}, 10000);
  }
}
//ADD HUB
document.getElementById("buttonAddressHub").onclick = function() {addHub()};
var inputAddressHub = document.getElementById("inputAddressHub")

async function addHub() {
  if (inputAddressHub.value == "0x"){
  	inputAddressHub.value = '';
  	$("#allertAddHub").html('<div class="alert alert-success alert-dismissible fade show" id="allertHub" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertHub").remove();}, 10000);
  }
  else{
  	inputAddressHub.value = '';
  	$("#allertAddHub").html('<div class="alert alert-danger alert-dismissible fade show" id="allertHub" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertHub").remove();}, 10000);
  }
}

//ADD USER
var hashDocumentID_user;
document.getElementById('inputUserAddress').addEventListener('change', hashFileIDUser, false);
async function hashFileIDUser(evt) {
    const file = document.getElementById('inputUserAddress').files[0];
	var reader = new FileReader();
    let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
	shaObj.update(reader.readAsArrayBuffer(file));
	hashDocumentID_user = "0x" + shaObj.getHash("HEX");
	console.log(hashDocumentID_user);
	try {
		$("#hashDocumentIDUser").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>'+hashDocumentID_user+'</div>');
	} catch (error) {
		$("#hashDocumentIDUser").html('<div class="alert alert-primary" role="alert">'+error+'</div>');
	}
}

document.getElementById("buttonAddUser").onclick = function() {addUser()};
var inputAddUser = document.getElementById("inputAddUser")

async function addUser() {
  if (inputAddUser.value == "0x"){
  	inputAddUser.value = '';
  	console.log("ID "+hashDocumentID_user);
  	$("#allertAddUser").html('<div class="alert alert-success alert-dismissible fade show" id="allertUser" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertUser").remove();}, 10000);
  }
  else{
  	inputAddUser.value = '';
  	$("#allertAddUser").html('<div class="alert alert-danger alert-dismissible fade show" id="allertUser" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertUser").remove();}, 10000);
  }
}

//TEST PUBLISH
var hashDocumentID_testP;
var hashDocument_testP;
var positivity_testP;
document.getElementById('inputTestDocumentID').addEventListener('change', hashFileID, false);
async function hashFileID(evt) {
    const file = document.getElementById('inputTestDocumentID').files[0];
	var reader = new FileReader();
    let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
	shaObj.update(reader.readAsArrayBuffer(file));
	hashDocumentID_testP = "0x" + shaObj.getHash("HEX");
	console.log(hashDocumentID_testP);
	try {
		$("#hashTestDocumentID").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>'+hashDocumentID_testP+'</div>');
	} catch (error) {
		$("#hashTestDocumentID").html('<div class="alert alert-primary" role="alert">'+error+'</div>');
	}
}

document.getElementById('inputDocumentTest').addEventListener('change', hashFile, false);
async function hashFile(evt) {
    const file = document.getElementById('inputTestDocumentID').files[0];
	var reader = new FileReader();
    let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
	shaObj.update(reader.readAsArrayBuffer(file));
	hashDocument_testP = "0x" + shaObj.getHash("HEX");
	console.log(hashDocument_testP);
	try {
		$("#hashTestDocument").html('<div class="alert alert-primary" role="alert"><strong>Hash document is: </strong>'+hashDocument_testP+'</div>');
	} catch (error) {
		$("#hashTestDocument").html('<div class="alert alert-primary" role="alert">'+error+'</div>');
	}
}

document.getElementById("buttonTestPublish").onclick = function() {testPublish()};
var inputTestPublish = document.getElementById("inputTestPublish")
async function testPublish() {
  if (inputTestPublish.value == "0x"){
  	//uploadDocument();
  	inputTestPublish.value = '';
  	console.log("ID "+hashDocumentID_testP);
  	console.log("TEst "+hashDocument_testP);
  	//selector
  	positivity = document.getElementById("inputPosivity").value;
	console.log(positivity);
  	$("#allertTestPublish").html('<div class="alert alert-success alert-dismissible fade show" id="allertTest" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertTest").remove();}, 10000);
  }
  else{
  	inputTestPublish.value = '';
  	$("#allertTestPublish").html('<div class="alert alert-danger alert-dismissible fade show" id="allertTest" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertTest").remove();}, 10000);
  }
}


});