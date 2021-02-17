// const Web3 = require("web3");
// const ethers = require('ethers');
// var web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');

// replace these values with those generated in your TokBox Account
var apiKey = "46995354";
var sessionId = "2_MX40Njk5NTM1NH5-MTYwNTgyOTY1NjEwNH5Zb3JBcG1NY3A5NUl4ZGdwYXMwRG1WSFJ-fg";
var token = "T1==cGFydG5lcl9pZD00Njk5NTM1NCZzaWc9MTdjNDA0MmU0MzRmODcyOGI3YTc3NjVjOTJlNDVmMzFlZDJhZjRiMzpzZXNzaW9uX2lkPTJfTVg0ME5qazVOVE0xTkg1LU1UWXdOVGd5T1RZMU5qRXdOSDVaYjNKQmNHMU5ZM0E1TlVsNFpHZHdZWE13UkcxV1NGSi1mZyZjcmVhdGVfdGltZT0xNjA1ODI5NjY2Jm5vbmNlPTAuNTAyMzk0NTQxMjg1Nzg2NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA1ODMzMjY1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
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

let tokenAddress = "0x81e94064742e1BE132E7b4E1F12F947441d0FCAa";
let walletAddress;
// Get ERC20 Token contract instance
let contract = web3.eth.contract(minABI).at(tokenAddress);

console.log("CHANGES COMING THRUY!");


let flag = false;

let currentAccount = null;

let gBalance = 0;
console.log("HEY!");

filter = {
    address: tokenAddress,
    topics: [
        // the name of the event, parnetheses containing the data type of each event, no spaces
        utils.id("TransactionStateUpdate(uint,Transaction)")
    ]
}
provider.on(filter, () => {
    console.log("HEEEEE");
})
ethereum.enable().then(() => {
	ethereum.request({ method: 'eth_accounts' }).then((res) => {
	console.log(res);
	console.log(res[0]);
	//console.log(getBalance(res[0]));
	walletAddress = res[0];
	contract.balanceOf(walletAddress, (error, balance) => {
		//
		
		contract.decimals((error, decimals) => {
			balance = balance.div(10**decimals);
			gBalance = balance;

      console.log("HERE???");
      
			if(balance < 24) {
				
				flag = true;
				throw new Error("You gotta get COVID to hang with us hunny");

			}
			console.log("BALANCE" + balance);
		});

	});
	function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

var SERVER_BASE_URL = 'https://second-try-remote.herokuapp.com';
    fetch(SERVER_BASE_URL + '/session', {
      mode: 'no-cors'
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      if(!flag) { //check if has COVD minimum!
      	initializeSession();
      } else {
      	throw new Error('You gotta have some $COVD (buy some on $UNI)');
      }
      
    }).catch(handleError);

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  console.log("HEYYY " + gBalance);
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



});

})

console.log(walletAddress);




// Call balanc

console.log("3");
// Handling all of our errors here by alerting them
