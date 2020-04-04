const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})
exports.handler = (event, context, callback) => {
  return client
    .query(q.Paginate(q.Match(q.Index('all_items'))))
    .then((response) => {
      const refs = response.data
      const toQuery = refs.map((ref) => {
        return q.Get(ref)
      })
      return client.query(toQuery).then((ret) => {
        const result = {}
        ret.forEach((r, i) => {
          result[
            r.ref
              .toString()
              .split(', "')[1]
              .split('"')[0]
          ] = r.data
        })
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(result)
        })
      })
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
