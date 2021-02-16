const { expect } = require('@jest/globals');
const captureCourseProgress = require('../../../lambdas/courses/captureCourseProgress');
const eventGenerator = require('../../testUtils/eventGenerator');
const validators = require('../../testUtils/validators');

describe('Capture Course session stats', () => {
    test('upon request takes body and captures a session stats', async () => {
        const body = {
            sessionId: 'sessionId',
            totalModulesStudied: 20,
            averageScore: 20,
            timeStudied: 20
        };
        const headers = { 'X-User-Id': 'userId'}
        const path = {
            courseId: 'courseId',
        };
        const event = eventGenerator({
            body,
            headers,
            path
        });
        const res = await captureCourseProgress.handler(event)
        
        expect(res).toBeDefined();

        expect(validators.isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(201);
        expect(JSON.parse(res.body)).toEqual('OK');
    });
})