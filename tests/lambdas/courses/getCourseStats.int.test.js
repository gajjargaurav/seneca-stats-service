const { expect } = require('@jest/globals');
const eventGenerator = require('../../testUtils/eventGenerator');
const getCourseStats = require('../../../lambdas/courses/getCourseStats');
const captureCourseProgress = require('../../../lambdas/courses/captureCourseProgress');
const validators = require('../../testUtils/validators');

const addStat = async () => {
    const body = {
        sessionId: 'sessionId2',
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
    return await captureCourseProgress.handler(event)
}

describe('Get aggregated Course Stats', () => {
    test('should return aggregated Course Stats for given Course and User', async () => {
        // Arrange
        const headers = { 'X-User-Id': 'userId'}
        const path = {
            courseId: 'courseId',
        };
        const event = eventGenerator({
            headers,
            path
        });
        
        
        // Add an extra stat so we can do the aggregation test properly
        await addStat();
        
        // update the expected
        const expected = {
            totalModulesStudied: 40,
            averageScore: 20,
            timeStudied: 40
        };
        // Act
        const res = await getCourseStats.handler(event)

        // Assert            
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body)).toEqual(expected);
    })
})
