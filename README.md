# UtopiaS3Listener

This project will create an S3 bucket and a corresponding lambda function which will listen for S3 create events, which end in .csv. The Lambda function will then marshal the contents of the csv into Entities to be added to the RDS by another Lambda
