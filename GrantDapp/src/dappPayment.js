
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
            console.log('No matching award found for ' + currentUser);
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
        const projectId = '21UXYun1jX8xQTLalR3oyYynzEx'
        const projectSecret = '1ba644f141feb79e0d7f2dec897883d5'
        const auth = 'Basic ' + projectId + ':' + projectSecret.toString('base64')
        const client = await IpfsHttpClient.create({
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https',
          headers: {
             authorization: auth
           }
        })
        const version = await client.version();
        console.log("IPFS Node Version:", version.version);
         // const { cid } = await client.add('Greetings from Chris Stone! I love my kids!')        
        // const cat = async (cid) => {
        //   const content = []
        
        //   for await (const chunk of client.cat(cid)) {
        //     content.push(chunk)
        //   }
        // console.log(content);
        //   return content
        // }

          for (var i = 0; i < input.files.length; ++i) {
            
            console.log(input.files.item(i).name);

            try {
              const file = await client.add(input.files[i])

              // try client.pin.add above instead and see if it persists in Infura - Dec 21



              // client.pin.add(file.cid).then((res) => {
              //   console.log('Results of Pin: ' + res)
              // })
              console.log('https://ipfs.io/ipfs/' + file.path)
            } catch (error) {
              console.log(error)  
            }


            // var file = input.files[i];
            // var reader = new FileReader();
            // reader.readAsText(file, "UTF-8");
            // reader.onload = function (evt) {

            //    // document.getElementById("fileContents").innerHTML = evt.target.result;
            // }
            // reader.onerror = function (evt) {
            //     document.getElementById("fileContents").innerHTML = "error reading file";
            // }
          }
    }
      const commentsValue = document.getElementById('addlComments').value.trim();
      console.log(commentsValue);
      const timeSubmitted = Date.now().toString();      
      console.log(timeSubmitted);

	}
}

