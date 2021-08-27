import detectEthereumProvider from '@metamask/detect-provider';
// import { ethers } from "ethers";
// import { cors } from "../config/security.js";
// import { Web3 } from "web3";
//require("regenerator-runtime/runtime");
const Web3 = require("web3");
const ethers = require('ethers');
const axios = require('axios');
// var web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
//var Web3 = require('web3');



// replace these values with those generated in your TokBox Account
//let apiKey = "46995354";

const SERVER_BASE_URL = 'https://most-updated-video-chat.herokuapp.com';

// The minimum ABI to get ERC20 Token balance
const mainNetworkUrl = "https://mainnet.infura.io/v3/29588a3dfcd742b48547f72ba8ff245b";
const ropstenURL = "https://ropsten.infura.io/v3/29588a3dfcd742b48547f72ba8ff245b";
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

let tokenAddress = "0xb699d1b33cb82034bcdb6eb2a52bdd866f0744a4";
let walletAddress;




async function getProvider() {

const provider = await detectEthereumProvider();

return provider;

}

const provider = getProvider();

if (provider) {
  // From now on, this should always be true:
  // provider === window.ethereum
  console.log("all good!"); // initialize your app
} else {
  console.log('Please install MetaMask!');
}




 // fetch(SERVER_BASE_URL + '/session', {
//   mode: 'no-cors'
// }).then(function(res) {
//   console.log(res);
//   apiKey = res.apiKey;
//   sessionId = res.sessionId;
//   token = res.token;



//https://api.tokenbalance.com/token/


// Get ERC20 Token contract instance

//const provider = new ethers.providers.JsonRpcProvider(ropstenURL);
// const signer = provider.getSigner(0);/
//console.log(signer.getAddress());
// const contractToQuery = new ethers.Contract(
//   tokenAddress,
//   minABI,
//   provider
// );

let hasEnough = true;

async function asyncFunc(addr) {
  // fetch data from a url endpoint
  let path = "https://test.tokenbalance.com/balance/" + tokenAddress + '/' + addr;
  console.log(path);
  const res = await axios.get(path);
  console.log(res.data);

  if(res.data >= 24) {
    startVideoChat(res.data);
  } else {
    alert("You need at least 1 $COVD to video chat!");
  }
  


}
//asyncFunc();







let currentAccount = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    console.log(currentAccount);
    asyncFunc(currentAccount);
    // Do any other work!
  }
}





// async function asyncFunc() {
//   // fetch data from a url endpoint
//   console.log("hi");
//   let x = await fetch("https://test.tokenbalance.com/balance/" + tokenAddress + '/' + walletAddress + '/', {

//     }).then((res) => {
//       console.log(res);
//       if(5 <= 0) {

//         hasEnough = false;
//         alert("You need at least 1 $COVD to video chat!")
//       } else {
//         console.log("Welcome to the citadel!");
//         startVideoChat();
//       }

//   });
//   return x;
//   //let path = "https://test.tokenbalance.com/balance/" + tokenAddress + '/' + walletAddress + '/';
// }
// console.log(asyncFunc());

// ethereum
//   .request({
//     method: 'eth_accounts',
//   })
//   .then((result) => {
//     walletAddress = result[0];
//     console.log("HERE");
    
//     console.log(path);
//     fetch("https://test.tokenbalance.com/balance" + tokenAddress + '/' + walletAddress, {

//     }).then((res) => {
//       console.log(res);
//       if(5 <= 0) {

//         hasEnough = false;
//         alert("You need at least 1 $COVD to video chat!")
//       } else {
//         console.log("Welcome to the citadel!");
//         startVideoChat();
//       }

//     });
//     console.log("wa" + walletAddress);
//   })
//   .catch((error) => {
//     alert("You need at least 1 $COVD to video chat!");
//   });


function startVideoChat(balance) {
  if(hasEnough) { //check if has COVD minimum!
    initializeSession();
  } else {
    alert('You gotta have some $COVD (buy some on $UNI)');
  }
//   fetch(SERVER_BASE_URL + '/session', {
//   mode: 'no-cors'
// }).then(function(res) {
//   console.log(res);
//   apiKey = res.apiKey;
//   sessionId = res.sessionId;
//   token = res.token;
  
  
// }).catch(handleError);
}




function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  let apiKey = "46995354";
  var sessionId = "1_MX40Njk5NTM1NH5-MTYxMzYwNTA3NjU1NH5JbnVqeUVhQkdyN3Z4ZTZkcERDbnhiL3B-fg";
  let session = OT.initSession(apiKey, sessionId);


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
  var token = "T1==cGFydG5lcl9pZD00Njk5NTM1NCZzaWc9YzczZDQ3YTM4NGM2MDRhYTgxYzBkZjEwYzUxMTIyMmViNjRmN2U3OTpzZXNzaW9uX2lkPTFfTVg0ME5qazVOVE0xTkg1LU1UWXhNell3TlRBM05qVTFOSDVKYm5WcWVVVmhRa2R5TjNaNFpUWmtjRVJEYm5oaUwzQi1mZyZjcmVhdGVfdGltZT0xNjEzNjA1MDkxJm5vbmNlPTAuMDAzMjk5MDQ0MzQ5Njc2NTM4NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjE2MTkzNDkxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
