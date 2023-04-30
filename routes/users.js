var express = require('express');
var router = express.Router();
const sdk = require('node-appwrite');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // Init SDK
const client = new sdk.Client();

const account = new sdk.Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
    .setJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...') // Your secret JSON Web Token
;

const promise = account.get();

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
  res.send('respond with a resource');

});

module.exports = router;
