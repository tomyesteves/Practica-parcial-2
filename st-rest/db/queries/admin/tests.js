const baseTestsQuery = `
    SELECT T.*,SUM(P."timeLimit") as "timeLimit", COUNT(P.id) as "partCount" 
    FROM "tests" T 
    LEFT JOIN "parts" P ON P."testId" = T.id `;

export const getTestsQuery = (opts = { "byId": false }) => {
    let query = baseTestsQuery;
    if (opts.byId) {
        query = query + " WHERE T.id=$1 ";
    }
    return `${query} GROUP BY T.id`
}

