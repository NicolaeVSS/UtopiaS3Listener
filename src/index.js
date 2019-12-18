const serverless = require('serverless-http');
const express = require('express')
const app = express()

// simple health check
app.get('/', function (req, res) {
  res.status(200).json({message:'Hello World!'});
});



module.exports.handler = serverless(app);