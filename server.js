// Sample webhook showing what a hasura auth webhook looks like

// init project
var express = require('express');
var app = express();
var requestClient = require('request');
var port = process.env.PORT || 3000;

/* A simple sample
   Flow:
   1) Extracts token
   2) Fetches userInfo in a mock function
   3) Return hasura variables
*/
function proxyExternalAuth (token, response) {
    // e.g. you might proxy to a webhook auth service and fwd the response
    requestClient('https://infinite-tor-17057.herokuapp.com/', function(error, authResp, body) {
        if (!error) {
            response.status(authResp.statusCode).json(JSON.parse(body));
        }
        else {
            response.status(500).json({"message": body});
        }
    });
}

function proxyInternalAuth (token, response) {
    // e.g. you might proxy to a jwt service or verify jwt token here
    var hasuraVariables = {
        'X-Hasura-Role': 'internal',  // result.role
        'X-Hasura-User-Id': '1'    // result.user_id
    };
    response.json(hasuraVariables);
}

app.get('/', (request, response) => {
  // Extract token from request
    var token = request.get('Authorization');
    var appName = request.get('X-Solaire-App');
    switch(appName) {
    case "external":
        proxyExternalAuth(token, response);
        break;
    case "internal":
        proxyInternalAuth(token, response);
        break;
    default:
        response.status(400).json({"message": "x-solaire-app header not found"});
    }
  }
);

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
