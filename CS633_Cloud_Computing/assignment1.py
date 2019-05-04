'''
Created on Jun 21, 2017
@author: CALEB FARRIS
Assignment1.py
This is the source code for question 4 on the first assignment
'''

import boto3
import botocore

#constants
AWSKEYS = 'awskeys.csv'
USERFILE = 'username.txt'
BUCKET = 'crazy-flying-wolfman-mosquito'
DOWNLOADED_FILE = 'downloaded-username.txt'

#-----------------------------------------------------------------------------
#                    PART 1:  READING FROM FILE
#-----------------------------------------------------------------------------
#Making the assumption awskeys.cvs is local and separate lines for each key
with open(AWSKEYS) as f:
    document = f.read().splitlines();
    access_token_string = document[0]
    secret_key_string = document[1]

#splitting into sections based on '='
access_token_split_string = access_token_string.partition("=")
secret_key_split_string = secret_key_string.partition("=")

#Checking conditions just to make sure correct keys were read
if access_token_split_string[0] == 'AWSAccessKeyId':
    ACCESS_TOKEN = access_token_split_string[2]
if secret_key_split_string[0] == 'AWSSecretKey':
    SECRET_KEY = secret_key_split_string[2]
#-----------------------------------------------------------------------------
#                    PART 2:  USER INPUT
#-----------------------------------------------------------------------------
username = input("Please enter your name:  ")

#-----------------------------------------------------------------------------
#                    PART 3:  WRITE TO LOCAL FILE
#-----------------------------------------------------------------------------
with open(USERFILE, 'w') as f:
    f.write(username) 
    print(USERFILE + " created locally")
    
#-----------------------------------------------------------------------------
#                    PART 4:  UPLOADING
#-----------------------------------------------------------------------------
#Creating the client, and also s3 resource 
s3 = boto3.client(
    "s3", 
    aws_access_key_id=ACCESS_TOKEN, 
    aws_secret_access_key=SECRET_KEY
)
s3_resource = boto3.resource('s3', 
    aws_access_key_id=ACCESS_TOKEN, 
    aws_secret_access_key=SECRET_KEY                
)

#If region number > 1, must use this as 2nd parameter
#CreateBucketConfiguration={'LocationConstraint': 'us-east-2'}
#Creating Bucket
if (s3_resource.Bucket(BUCKET) not in s3_resource.buckets.all()):
    s3.create_bucket(Bucket=BUCKET)
    print("Bucket " + BUCKET + " created")

#Uploading file    
s3.upload_file(USERFILE, BUCKET, USERFILE)    
print(USERFILE + " added to " + BUCKET)
#-----------------------------------------------------------------------------
#                    PART 5:  DOWNLOADING & DISPLAYING
#-----------------------------------------------------------------------------
try:
    s3_resource.Bucket(BUCKET).download_file(USERFILE, DOWNLOADED_FILE)
    with open(DOWNLOADED_FILE) as f:
        file_data = f.readline()
        print("Downloaded data from Bucket=" + BUCKET +", file=" + USERFILE + 
              ":  " + file_data)
except botocore.exceptions.ClientError as error:
    if error.response['Error']['Code'] == "404":
        print("Object doesn't exist.")
    else:
        raise
#-----------------------------------------------------------------------------
#                    PART 6:  DELETING BUCKET FILE
#-----------------------------------------------------------------------------
try:
    for entry in s3_resource.Bucket(BUCKET).objects.all():
        if (entry.key == USERFILE):
            entry.delete()
            print(USERFILE + " deleted from bucket:  "  + BUCKET)
except botocore.exceptions.ClientError as error:
    if error.response['Error']['Code'] == "404":
        print("Object doesn't exist.")
    else:
        raise