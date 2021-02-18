# Seneca Stats Service

This service provides an interface defined in [swagger spec](seneca-backend-swagger.yml)

It uses nodejs with [Serverless Framework](https://www.serverless.com/) and [AWS](http://aws.amazon.com/).

## Prerequisite

* nodejs & npm

* AWS Account
    
     Please ensure that you have an AWS account

* Serverless Framework

    Install serverless using `npm install serverless -g`

## Test it locally

* On root of your project run `npm i` to install dependencies.
* Run `npm t` to run integration and unit tests

## Test API locally using `serverless offline` 

* Run `sls offline start`

    It should provide you with following endpoints to invoke locally

    ```
    POST | http://localhost:3000/dev/courses/{courseId}
    GET  | http://localhost:3000/dev/courses/{courseId}
    GET  | http://localhost:3000/dev/courses/{courseId}/sessions/{sessionId}
    ```

  > NOTE: In order to run it offline `serverless-dynamodb-local` plug in used (ref: [serverless-dynamodb-local](https://www.npmjs.com/package/serverless-dynamodb-local)). 
  
  > In some cases it is needed to install Java Runtime Engine (needed for Dynamo). If so please install it using https://www.oracle.com/java/technologies/javase-jre8-downloads.html

  > you can install dynamodb plugin using serverless to through `sls dynamodb install` . 

  > More information on the plugin https://www.serverless.com/plugins/serverless-dynamodb-local


## Deploying the stack on AWS

### Setup 
1. Configure Serverless to use AWS account 

    Since we are going to use AWS for our deployments we will need to configure Serverless to be able to use the AWS. To do that we will need to create a user in `AWS Console` using [the instructions for setting up your AWS user for serverless cli](USERSETUP.md)


2. Run `serverless config credentials --provider aws --key xxx --secret yyy -profile serverless-admin`


    > NOTE: Replace `xxx` with your `Access key ID` and `yyy` with your `Secret access key`

    > If you used any other user name instead of `serverless-admin` then please update the above command accordingly to reflect that. We have used `serverless-admin` for the purposes of this exercise. if you do so please update `profile` and `region` in `serverless.yml` to ensure that correct profile and region is used. 

3. Ensure that all dependencies are installed via `npm i` as they will need to be packaged up.

4.  Now run `serverless deploy -v`.
        
    That will deploy the stack to AWS and provide you with the endpoint information to invoke them and test it

5.  Use a tool like [Postman](https://www.postman.com/) is a good tool to test endpoints.


