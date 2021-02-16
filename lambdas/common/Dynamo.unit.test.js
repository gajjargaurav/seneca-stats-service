const { expect } = require('@jest/globals');
const Dynamo = require('./Dynamo');

test('Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object');
});

test('dynamo has get and write', () => {
    expect(typeof Dynamo.write).toBe('function');
});

const validTableName = 'course-stats-table';
const data = { id: 'user id', sk: 'some sk',  sessionId: 'session id', totalModulesStudied: 25, averageScore: 10, timeStudied: 20 };

test('Dynamo write works', async () => {
    expect.assertions(1);
    try {
        const res = await Dynamo.write(data, validTableName);
        expect(res).toBe(data);
    } catch (error) {
        console.log('error in dynamo write test', error);
    }
});

test('dynamo query works', async () => {
    expect.assertions(4);
    try {
        const params = {
            TableName: validTableName,
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeNames: { '#id': 'id' },
            ExpressionAttributeValues: { ':id': data.id},
        };
        const res = await Dynamo.query(params, validTableName);
        expect(res).not.toBe(null);
        expect(res.Count).toBe(1)
        expect(res.Items).not.toBe(null);
        expect(res.Items[0]).toEqual(data);
    } catch (error) {
        console.log('error in dynamo query', error);
    }
});


