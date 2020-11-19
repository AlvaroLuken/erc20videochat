// replace these values with those generated in your TokBox Account
var apiKey = "46995354";
var sessionId = "2_MX40Njk5NTM1NH5-MTYwNTgxMzYzMjU5NH4wZ0xkSDE5anBXQjBLbnVkMnNYV0NFZzF-fg";
var token = "T1==cGFydG5lcl9pZD00Njk5NTM1NCZzaWc9MWVhZTJmNWMyMGQyZjVlMDlhN2M4Mzc5OWFmNDM5MGU1Y2JiMzNiZTpzZXNzaW9uX2lkPTJfTVg0ME5qazVOVE0xTkg1LU1UWXdOVGd4TXpZek1qVTVOSDR3WjB4a1NERTVhbkJYUWpCTGJuVmtNbk5ZVjBORlp6Ri1mZyZjcmVhdGVfdGltZT0xNjA1ODEzNjc4Jm5vbmNlPTAuODI0NDE5NDAyNTk0MzQ0NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA4NDA1Njc3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";



// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

var SERVER_BASE_URL = 'https://shrouded-anchorage-86325.herokuapp.com/';
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