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
  const bucketName = event.Records[0].s3.bucket.name;
  const objectkey = event.Records[0].s3.object.key;

  const myfile = s3.getObject({Bucket: bucketName, Key: objectkey}).createReadStream();
  // .then(resolve => {
  //   return fs.createReadStream(resolve.body);
  // })
  
  await csv().fromStream(myfile).subscribe((json) => {
    console.log(json)
  })

  // console.log("bucketName: " + bucketName + "\tobjectKey: " + objectkey)
  // console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
  // let buckets = await s3.listBuckets().promise();
  // let stuff = await s3.getObject
  // console.log(buckets);
  return new Response(204);
}