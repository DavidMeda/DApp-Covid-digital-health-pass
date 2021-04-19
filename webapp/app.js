
console.log("HELLO");


//get a SHA-256 hash from a file --> works synchronously
function calculateHash (fileName) {
  let fileContent = fs.readFileSync(fileName);
  return calculateHashBytes(fileContent);
};

//get a SHA-256 hash from a data Buffer --> works synchronously
function calculateHashBytes (data) {
  let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  shaObj.update(data);
  let hash = "0x" + shaObj.getHash("HEX");
  return hash;
};


$('document').ready(function(){

//ADD MINESTRY
document.getElementById("buttonAddressMinestry").onclick = function() {addMinestry()};
var inputAddressMinestry = document.getElementById("inputAddressMinestry")

function addMinestry() {
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

function addHub() {
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
document.getElementById("buttonAddUser").onclick = function() {addUser()};
var inputAddUser = document.getElementById("inputAddUser")

function addUser() {
  if (inputAddUser.value == "0x"){
  	inputAddUser.value = '';
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
document.getElementById("buttonTestPublish").onclick = function() {testPublish()};
var inputTestPublish = document.getElementById("inputTestPublish")

async function uploadDocument() {
	console.log($('#inputDocumentID')[0]);
    if ($('#inputDocumentID').length > 0){
    	let fileReader = new FileReader();
    	fileReader.onload = function() {
    		let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
			shaObj.update(fileReader.readAsArrayBuffer());
			let documentHash = "0x" + shaObj.getHash("HEX");
            console.log(documentHash);
        }
    }else{console.log("NO FILE");}
}


function testPublish() {
  if (inputTestPublish.value == "0x"){
  	uploadDocument();
  	inputTestPublish.value = '';
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