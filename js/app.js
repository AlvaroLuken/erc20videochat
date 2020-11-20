// const Web3 = require("web3");
// const ethers = require('ethers');
// var web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');

// replace these values with those generated in your TokBox Account
var apiKey = "46995354";
var sessionId = "2_MX40Njk5NTM1NH5-MTYwNTgyOTY1NjEwNH5Zb3JBcG1NY3A5NUl4ZGdwYXMwRG1WSFJ-fg";
var token = "T1==cGFydG5lcl9pZD00Njk5NTM1NCZzaWc9MTdjNDA0MmU0MzRmODcyOGI3YTc3NjVjOTJlNDVmMzFlZDJhZjRiMzpzZXNzaW9uX2lkPTJfTVg0ME5qazVOVE0xTkg1LU1UWXdOVGd5T1RZMU5qRXdOSDVaYjNKQmNHMU5ZM0E1TlVsNFpHZHdZWE13UkcxV1NGSi1mZyZjcmVhdGVfdGltZT0xNjA1ODI5NjY2Jm5vbmNlPTAuNTAyMzk0NTQxMjg1Nzg2NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA1ODMzMjY1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";


let tokenAddress = "0xB699d1B33CB82034BCdb6eB2a52bdd866f0744a4";
let walletAddress = "0x8443379cBaF7A68B2Cc1626Df9e4Cb47d525A0e4";

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

// Get ERC20 Token contract instance
let contract = web3.eth.contract(minABI).at(tokenAddress);

// Call balanceOf function
contract.balanceOf(walletAddress, (error, balance) => {
  // Get decimals
  contract.decimals((error, decimals) => {
    // calculate a balance
    balance = balance.div(10**decimals);
    console.log(balance.toString());
  });
});


let id;

ethereum.enable().then(() => {
  id = ethereum.selectedAddress
});
console.log("1");

console.log("Id is: " + id);


console.log("3");
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

var SERVER_BASE_URL = 'https://second-try-remote.herokuapp.com';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      if(ethereum.isConnected()) { //check if has COVD minimum!
      	initializeSession();
      } else {
      	alert('connect metamask!');
      }
      
    }).catch(handleError);

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  session.on('streamCreated', function(event) {
	  session.subscribe(event.stream, 'subscriber', {
	    insertMode: 'append',
	    width: '100%',
	    height: '100%'
	  }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}