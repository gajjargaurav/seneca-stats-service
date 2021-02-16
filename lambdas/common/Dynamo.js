const AWS = require('aws-sdk');

let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async query(params) {
        const data = await documentClient.query(params).promise();
        
        if (!data || !data.Items) {
            throw Error(`There was an error fetching the data from ${params.TableName}`);
        }

        return data;
    },
    async write(data, TableName) {
        if (!data.id) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting id of ${data.id} in table ${TableName}`);
        }

        return data;
    },
}

module.exports = Dynamo;