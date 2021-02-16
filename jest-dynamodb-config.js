module.exports = {
    tables: [
        {
            TableName: 'course-stats-table',
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'sk',
                    KeyType: 'RANGE',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'sk',
                    AttributeType: 'S',
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};
