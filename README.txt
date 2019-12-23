To run this project, run the following commands:

npm install
serverless deploy

Currently, the repo creates an S3 bucket with the name specified in the serverless.yml file,
creates a lambda function with S3 permissions, and creates an event listener on the S3 for ".csv" files
which triggers the lambda to output marshalled JSON objects in Cloudwatch, later to be PUT/POST to AWS Kinesis
