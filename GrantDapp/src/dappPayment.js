window.addEventListener('load', function() {
  
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.isMetaMask === true && ethereum.selectedAddress !== null) {
      } else {
            console.log('MetaMask is not available')
            window.location.assign("Onboard.html")
      }
    } else {
        console.log('window.ethereum - metamask - is not found')
        window.location.assign("Onboard.html")
    }
  })

  window.onload = async () => {

    // console.log(ethereum.selectedAddress);
    var currentUser = ethereum.selectedAddress;
	// document.getElementById('pKey').value = currentUser;
    var valueBalance = await grantMgmt.methods.balanceOf(currentUser).call()
	document.getElementById('availBalance').value = Math.round(valueBalance * .000000000000000001);
    
    var valueAwardsNumber = await grantMgmt.methods.getNumberAwards().call()

    for (let i = 0; i < valueAwardsNumber; i++) {
        //console.log(i);
        var valueAwardItem = await grantMgmt.methods.awards(i).call()
        //Object.values(valueAwardItem).forEach(val => console.log(val));
        let arr = valueAwardItem;
        // console.log(currentUser);        
        // console.log(arr[1]);

         if (arr[1].toLowerCase() == currentUser) {
            // console.log('Matching award found for ' + arr[4]);
            document.getElementById('awardID').value = i;
            document.getElementById('vendor').value = arr[0];
            document.getElementById('grant').value = arr[4];
            document.getElementById('awardValue').value = arr[10];
            document.getElementById('pKey').value = currentUser;
         } else {
            // console.log('No matching award found for ' + currentUser);
        }


    }

}

// Process Form Inputs
if (document.getElementById('submitInvoice')) {
	const clickSubmitButton = document.getElementById('submitInvoice')
	clickSubmitButton.onclick = async () => {

      const awardID = document.getElementById('awardID').value;
      console.log(awardID);
      const grantNumber = document.getElementById('grant').value;
      console.log(grantNumber);
      const thePublicKey = document.getElementById('pKey').value;
      console.log(thePublicKey);
      const laborValue = document.getElementById('laborClin').value;
      console.log(laborValue);
      const travelValue = document.getElementById('travelClin').value;
      console.log(travelValue);
      const odcValue = document.getElementById('odcClin').value;
      console.log(odcValue);
      const totalValue = document.getElementById('totalInvoice').value;
      console.log(totalValue);

      var input = document.getElementById('file');




      if (input.files.length > 0) {
        console.log('Files do exist.');

        // const node = await IPFS.create()
        // const data = 'Hello, <YOUR NAME HERE>'
        // // add your data to to IPFS - this can be a string, a Buffer,
        // // a stream of Buffers, etc
        // const results = node.add(data)
        // // we loop over the results because 'add' supports multiple 
        // // additions, but we only added one entry here so we only see
        // // one log line in the output
        // for await (const { cid } of results) {
        //   // CID (Content IDentifier) uniquely addresses the data
        //   // and can be used to get it again.
        //   console.log(cid.toString())
        // }

        // const ipfs = await IPFS.create()
        // const { cid } = await ipfs.add('Hello world')
        // console.info(cid)
        // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
        


          for (var i = 0; i < input.files.length; ++i) {
            console.log(input.files.item(i).name);

            var file = input.files[i];
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
               // document.getElementById("fileContents").innerHTML = evt.target.result;
            }
            reader.onerror = function (evt) {
                document.getElementById("fileContents").innerHTML = "error reading file";
            }
          }
    }

      const commentsValue = document.getElementById('addlComments').value.trim();
      console.log(commentsValue);
      const timeSubmitted = Date.now().toString();      
      console.log(timeSubmitted);

    // const mintStatus = document.getElementById('mintingComplete')
		// mintStatus.innerHTML = ``
		// const addressValue = document.getElementById('_receiveAddr').value;
		// const numberTokens = document.getElementById('_numToMint').value;
		// await grantMgmt.methods.mint(addressValue, numberTokens).send({from: ethereum.selectedAddress}).then(result => {
		// 	mintStatus.innerHTML = `See Transaction Information by Clicking Here`
		// 	mintStatus.href = `https://ropsten.etherscan.io/tx/${result.transactionHash}`
		// })
		// var updatedSupplyValue = await grantMgmt.methods.totalSupply().call()
		// const setNewSupplyValue = document.getElementById('totalSupply')
		// setNewSupplyValue.innerHTML = 'Current Supply: ' + Math.round(updatedSupplyValue * .000000000000000001)
		// document.getElementById('_receiveAddr').value = ''
		// document.getElementById('_numToMint').value = ''


	}
}

