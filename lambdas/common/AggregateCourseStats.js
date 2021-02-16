const AggregateCourseResults = ({ Items }) => {
    let totalScore = 0;
    const results = Items.reduce(
        (acc, result) => {
            acc.timeStudied += result.timeStudied;
            acc.totalModulesStudied += result.totalModulesStudied;
            totalScore += result.averageScore * result.totalModulesStudied;
            acc.averageScore = totalScore / acc.totalModulesStudied;
            return acc;
        },
        { timeStudied: 0, totalModulesStudied: 0, averageScore: 0 },
    );
    return results;
};

module.exports = AggregateCourseResults;
