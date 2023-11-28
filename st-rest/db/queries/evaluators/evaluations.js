const baseEvaluationsQuery = "SELECT * FROM evaluations e ";

export const getEvaluationsQuery = (opts = { "byId": false }) => {
    let query = baseEvaluationsQuery;
    if (opts.byId) {
        query += "WHERE e.id=$1";
    }
    return query;
}
