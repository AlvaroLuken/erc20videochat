
import { ethers } from "ethers";
import { cors } from "../config/security.js";
import { Web3 } from "web3";
//require("regenerator-runtime/runtime");
// const Web3 = require("web3");
// const ethers = require('ethers');
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
// Get ERC20 Token contract instance

const provider = new ethers.providers.JsonRpcProvider(ropstenURL);
// const signer = provider.getSigner(0);/
//console.log(signer.getAddress());
const contractToQuery = new ethers.Contract(
  tokenAddress,
  minABI,
  provider
);

let hasEnough = true;

ethereum
  .request({
    method: 'eth_accounts',
  })
  .then((result) => {
    walletAddress = result[0];
    console.log("wa" + walletAddress);
    contractToQuery.balanceOf(walletAddress).then((res) => {
      let bal = parseInt(res._hex, 16);

      // if(bal == 0) {
      //   console.log("DONE!!!!!");
      // }
      // //let a = BigNumber.from(24);
      // console.log(bal)
      // //let bals = bal.toString().substring(0, 16);
      // let clean = ethers.utils.parseUnits(bal.toString(), 'gwei')
      // let check = ethers.utils.parseUnits("24", 'gwei');

      // //let wei = utils.bigNumberify(bal);


      // //let tr1 = ethers.utils.formatEther(wei);
      // console.log(clean);
      // console.log(check);

      // const etherValue = Web3.utils.fromWei(bal.toString());


      // let threshold = "240000000000000000000";
      //let hexString = threshold.toString(16);
      //console.log("ETH" + etherValue);
      //let t = parseInt(hexString, 16);

      if(bal <= 0) {

        hasEnough = false;
        alert("You need at least 1 $COVD to video chat!")
      } else {
        console.log("Welcome to the citadel!");
        startVideoChat();
      }
    }).catch((error) => {
      console.log(error);
    });
  })
  .catch((error) => {
    alert("You need at least 1 $COVD to video chat!");
  });


function startVideoChat() {
  fetch(SERVER_BASE_URL + '/session', {
  mode: 'no-cors'
}).then(function(res) {
  console.log(res);
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  if(hasEnough) { //check if has COVD minimum!
    initializeSession();
  } else {
    throw new Error('You gotta have some $COVD (buy some on $UNI)');
  }
  
}).catch(handleError);
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
