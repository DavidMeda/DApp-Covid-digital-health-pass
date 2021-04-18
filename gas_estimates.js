const covid_contract = artifacts.require("Covid");

contract("covid", (accounts) =>{
	let [owner, minestry, hub, user1, user2] = accounts;

	covid_contract.web3.eth.getGasPrice(function(errore, result){
			var gasPrice = Number(result);
			//console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"
			covid_contract.deployed().then(function(CovidContractInstance){
				return CovidContractInstance.addMinestry.estimateGas(minestry, {from: owner});
			}).then(function(result) {
		        var gas = Number(result);
		        console.log("\ngas estimation \"addMinestry()\" = " + gas + " units");
        		//console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        		console.log("gas cost estimation = " + covid_contract.web3.utils.fromWei( String(gas * gasPrice), 'ether') + " ether");
		    });
	})

	
})