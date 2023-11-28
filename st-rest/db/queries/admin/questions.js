const baseQuestionsQuery = `SELECT * from "questions" Q `;

export const getQuestionsQuery = (opts = { "byId": false, "byPartId": false }) => {
  let query = baseQuestionsQuery;
  if (opts.byId && opts.byPartId) {
    query = query + ' WHERE Q.id=$1 AND Q."partId"=$2 ';
  } else if (opts.byId) {
    query = query + " WHERE Q.id=$1 ";
  } else if (opts.byPartId) {
    query = query + ' WHERE Q."partId"=$1 ';
  }
  return `${query}`
}