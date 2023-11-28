const baseGradesQuery = `SELECT * from "grades" G `;

export const getGradesQuery = (opts = { "byId": false }) => {
    let query = baseGradesQuery;
    if (opts.byId) {
        query = query + " WHERE G.id=$1 ";
    }
    return `${query}`
}

