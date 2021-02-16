const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
    // Validate
    // TODO: validation can be improved significantly by adding API Validation and schema 
    if(!event.headers['X-User-Id']) {
        Responses._400({ message: 'missing required X-User-Id header' });
    }
    if (!event.path || !event.path.courseId) {
        return Responses._400({ message: 'missing required courseId from the path' });
    }
    
    if(!event.body || !event.body.sessionId) {
        return Responses._400({ message: 'missing required SessionId from the body' });
    }

    const userId = event.headers['X-User-Id'];
    const courseId = event.path.courseId;
    const body = event.body;
    const sessionId = body.sessionId;

    // Build stat object from event 
    const stat = {
        id: userId,
        sk: `${courseId}-${sessionId}`,
        courseId,
        ...body,
    }

    // Write stat to database
    const result = await Dynamo.write(stat, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });

    if(!result) {
        return Responses._400({ message: `Failed to write stat for user ${userId} and course ${courseId}`});
    }

    // return result
    return Responses._201('OK');
 }