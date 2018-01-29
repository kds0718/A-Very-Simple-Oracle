// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import frozenoj_artifacts from '../../build/contracts/FrozenOJ.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var FrozenOJ = contract(frozenoj_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    FrozenOJ.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      console.log("The address of the account you are using: ", account);

      self.refreshPPI();
    });
  },

  setStatus: function(message) {
    var thestatus = document.getElementById("status");
    thestatus.innerHTML = message; 
  },

  refreshPPI: function() {
    var self = this;

    var frozenoj;
    var restwo; 
    
    
    FrozenOJ.at("0x1f8e5aa40f69c39b089ead323a2bde70c0b45e28").then(function(instance) {
      frozenoj = instance;
      console.log("Your Truffle Contract Instance: ", instance);
      self.setStatus("Initiating transactions, please wait a few seconds...")
      return frozenoj.update({from: account, gas: 2000000, value: 900000000000000});
    }).then(function(value) {
      console.log("Your transaction receipt from the Oraclize Update: ", value);
      return frozenoj.FrozenOJPPI({from: account})
    }).then(function(result){
      console.log("Initial result from Quandl before formatting: ", result);
      var balance_element = document.getElementById("ppi");
      balance_element.innerHTML = result/100;
      self.setStatus("Transaction completed, new PPI for Frozen Orange Juice above.")
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error updating information.");
    });
  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
