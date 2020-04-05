const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})
exports.handler = (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: 'Error: Not found.'
    }
  } else {
    return client
      .query(q.Create(q.Collection('items'), { data: JSON.parse(event.body) }))
      .then((response) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(response)
        })
      })
      .catch((error) => {
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
      })
  }
}
