const AggregateCourseResults = require('../common/AggregateCourseStats');
const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
    // VALIDATE
    // TODO: validation can be improved significantly by adding API Validation and schema 
    if(!event.headers['X-User-Id']) {
        Responses._400({ message: 'missing required X-User-Id header' });
    }
    if (!event.path || !event.path.courseId || !event.path.sessionId) {
        return Responses._400({ message: 'missing required courseId or sessionId from the path' });
    }
    const userId = event.headers['X-User-Id'];
    const { courseId, sessionId } = event.path;

    const sortKeyValue = `${courseId}-${sessionId}`;
    const params = {
        TableName: tableName,
        KeyConditionExpression: '#id = :id and #sk = :sortKey',
        ProjectionExpression: ['averageScore', 'timeStudied', 'totalModulesStudied'],
        ExpressionAttributeNames: { '#id': 'id', '#sk': 'sk' },
        ExpressionAttributeValues: { ':id': userId, ':sortKey': sortKeyValue},
    };

    const stats = await Dynamo.query(params).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!stats) {
        return Responses._204({ message: `Failed to stats for user ${userId} and course ${courseId}` });
    }
    
    // return result
    return Responses._200({ ...stats.Items[0] });
}