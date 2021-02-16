const AggregateCourseResults = require('./AggregateCourseStats');

test('AggregateCourseResults is a function', () => {
    expect(typeof AggregateCourseResults).toBe('function');
});

test('AggregateCourseResults correctly aggregates results', () => {
    const id = 'userId';
    const courseId = 'courseId';
    let stats = { Items: [
        // totalModulesStudied * averageScore = 0 , totalModulesStudied: 0  total score : 0
        
        {id, sk: `${courseId}-1`, sessionId: '1', totalModulesStudied: 5, averageScore: 10, timeStudied: 20}, 
        // totalModulesStudied * averageScore = 50 , totalModulesStudied: 5  total score : 50

        {id, sk: `${courseId}-2`, sessionId: '2', totalModulesStudied: 10, averageScore: 20, timeStudied: 20},
        // totalModulesStudied * averageScore = 200 , totalModulesStudied: 15  total score : 250

        {id, sk: `${courseId}-3`, sessionId: '3', totalModulesStudied: 5, averageScore: 10, timeStudied: 20},
        // totalModulesStudied * averageScore = 50 , totalModulesStudied: 20  total score : 300

        {id, sk: `${courseId}-4`, sessionId: '4', totalModulesStudied: 10, averageScore: 20, timeStudied: 20},
        // totalModulesStudied * averageScore = 200 , totalModulesStudied: 30  total score : 500

        {id, sk: `${courseId}-5`, sessionId: '5', totalModulesStudied: 5, averageScore: 10, timeStudied: 20},
        // totalModulesStudied * averageScore = 50 , totalModulesStudied: 35  total score : 550

        {id, sk: `${courseId}-6`, sessionId: '6', totalModulesStudied: 5, averageScore: 10, timeStudied: 20}
        // totalModulesStudied * averageScore = 50 , totalModulesStudied: 40  total score : 600
    ]};
    // Average score = total score / total modules studied = 600 / 40 = 15;
    
    const expected = {
        totalModulesStudied: 40,
        averageScore:15,
        timeStudied:120
    }
    const results = AggregateCourseResults(stats);
    expect(results).toEqual(expected);
});