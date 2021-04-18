
console.log("HELLO");


$('document').ready(function(){

document.getElementById("buttonAddressMinestry").onclick = function() {myFunction()};

function myFunction() {
  if (document.getElementById("inputAddressMinestry").value == "0x"){
  	console.log("click");
  }
  else{
  	console.log("No click");
  }
}

/*
<div class="alert alert-danger alert-dismissible fade show" id="allertMinestry" role="alert"><strong>Transaction NOT executed!</strong> blablalbs.  <button type="button" class="close" data-dismiss="alert" aria-label="Close">  <span aria-hidden="true">×</span>  </button></div></div>
*/


});