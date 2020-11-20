// replace these values with those generated in your TokBox Account
var apiKey = "46995354";
var sessionId = "2_MX40Njk5NTM1NH5-MTYwNTgyOTY1NjEwNH5Zb3JBcG1NY3A5NUl4ZGdwYXMwRG1WSFJ-fg";
var token = "T1==cGFydG5lcl9pZD00Njk5NTM1NCZzaWc9MTdjNDA0MmU0MzRmODcyOGI3YTc3NjVjOTJlNDVmMzFlZDJhZjRiMzpzZXNzaW9uX2lkPTJfTVg0ME5qazVOVE0xTkg1LU1UWXdOVGd5T1RZMU5qRXdOSDVaYjNKQmNHMU5ZM0E1TlVsNFpHZHdZWE13UkcxV1NGSi1mZyZjcmVhdGVfdGltZT0xNjA1ODI5NjY2Jm5vbmNlPTAuNTAyMzk0NTQxMjg1Nzg2NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA1ODMzMjY1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

const Web3 = require("web3");
const ethers = require('ethers');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');



if(ethereum.isConnected()) {
	alert('heyyy');
}



var SERVER_BASE_URL = 'https://second-try-remote.herokuapp.com';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
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

  // Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

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