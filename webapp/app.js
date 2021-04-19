
console.log("HELLO");


$('document').ready(function(){

document.getElementById("buttonAddressMinestry").onclick = function() {myFunction()};
var inputAddressMinestry = document.getElementById("inputAddressMinestry")

function myFunction() {
  if (inputAddressMinestry.value == "0x"){
  	inputAddressMinestry.value = '';
  	$("#allertMinestry").html('<div class="alert alert-success alert-dismissible fade show" id="allertMinestry2" role="alert"><strong>Transaction executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertMinestry2").remove();}, 10000);
  }
  else{
  	inputAddressMinestry.value = '';
  	$("#allertMinestry").style = '';
  	$("#allertMinestry").html('<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry2" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>');
  	// this will automatically close the alert and remove this if the users doesnt close it in 5 sec
  	setTimeout(function() {$("#allertMinestry2").remove();}, 10000);
  }
}

/*
<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>
*/


});