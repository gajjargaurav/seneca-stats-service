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
    if (!event.path || !event.path.courseId) {
        return Responses._400({ message: 'missing required courseId from the path' });
    }

    const userId = event.headers['X-User-Id'];
    const courseId = event.path.courseId;

    const params = {
        TableName: tableName,
        KeyConditionExpression: '#id = :id and begins_with ( #sk, :courseId )',
        ProjectionExpression: ['averageScore', 'timeStudied', 'totalModulesStudied'],
        ExpressionAttributeNames: { '#id': 'id', '#sk': 'sk' },
        ExpressionAttributeValues: { ':id': userId, ':courseId': courseId },
    };

    const stats = await Dynamo.query(params).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!stats) {
        return Responses._204({ message: `Failed to stats for user ${userId} and course ${courseId}` });
    }
    const result = AggregateCourseResults(stats)
    // return result
    return Responses._200({ ...result });
}