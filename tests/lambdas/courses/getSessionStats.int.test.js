const { expect } = require('@jest/globals');
const eventGenerator = require('../../testUtils/eventGenerator');
const getSessionStats = require('../../../lambdas/courses/getSessionStats');
const validators = require('../../testUtils/validators');


describe('Get Session Stats for given course', () => {
    test('should return Session Stats for given Course and User', async () => {
        const headers = { 'X-User-Id': 'userId'}
        const path = {
            courseId: 'courseId',
            sessionId: 'sessionId'
        };
        const event = eventGenerator({
            headers,
            path
        });
        
        const expected = {
            totalModulesStudied: 20,
            averageScore: 20,
            timeStudied: 20
        };

        const res = await getSessionStats.handler(event)
            
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
        // expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body)).toEqual(expected);
    })
})
