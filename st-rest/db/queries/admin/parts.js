const basePartsQuery = `SELECT * from "parts" Q `;

export const getPartsQuery = (opts = { "byId": false }) => { 
  let query = basePartsQuery;
  if (opts.byId) {
    query = query + ' WHERE Q.id=$1';
  }
  return `${query}`
}

