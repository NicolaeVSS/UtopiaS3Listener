const serverless = require('serverless-http');
const aws = require('aws-sdk'); // get reference to S3 client
const util = require('util');
const s3 = new aws.S3();
const csv = require('csvtojson');
const fs = require('fs');

class Response{
  constructor(statusCode, body){
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
  }
}

// For async functions, you return a response, error, or promise to the runtime instead of using callback
// you can use return and throw to send a response or error
module.exports.handler = async (event, context) => {
  // DEBUG:
  // console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));

  const bucketName = event.Records[0].s3.bucket.name;
  const objectkey = event.Records[0].s3.object.key;
  // get the entity type, the object key should be formatted "[entity].csv" i.e. "airport.csv"
  const entityType = objectkey.split(".")[0];
  const entities = [];

  // get the file and marshal the csv rows into JSON objects
  const myfile = s3.getObject({Bucket: bucketName, Key: objectkey}).createReadStream();
  await csv().fromStream(myfile).subscribe((json) => {
    entities.push(json);
  });

  // based on the entity type, make different HTTP requests
  switch (entityType){
    case "airport":
      console.log("airport POST")
      break;
    case "flightPath":
      console.log("flightPath POST")
      break;
    case "flight":
      console.log("flight POST")
      break;
    default:
      return;
  };

  console.log(entities);

  return new Response(204);
}