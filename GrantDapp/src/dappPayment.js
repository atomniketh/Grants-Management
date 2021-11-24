window.addEventListener('load', function() {
  
    if (typeof window.ethereum !== 'undefined') {
        //console.log('window.ethereum is enabled')
      if (window.ethereum.isMetaMask === true && ethereum.selectedAddress !== null) {
            // console.log('MetaMask is active')
          //  console.log('getting current owner')
            //var activeWallet = ethereum.selectedAddress;
          //   const showOwnerOnLoad = document.getElementById('whoIsOwner')
          //   showOwnerOnLoad.innerHTML = 'Current Contract Owner: ' + ethereum.selectedAddress
      // do nothing
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
            document.getElementById('vendor').value = arr[0];
            document.getElementById('grant').value = arr[4];
            document.getElementById('awardValue').value = arr[10];
            document.getElementById('pKey').value = currentUser;
         } else {
            console.log('No matching award found for ' + currentUser);
        }


    }

}

