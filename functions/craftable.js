const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context, callback) => {
  return client
    .query(
      q.Paginate(
        q.Join(
          q.Difference(
            q.Match(q.Index('all_items')),
            q.Match(q.Index('items_search_by_type'), 'Base')
          ),
          q.Index('items_sort_by_name_asc')
        )
      )
    )
    .then((response) => {
      const refs = response.data
      const toQuery = refs.map((ref) => {
        return q.Get(ref[1])
      })
      return client.query(toQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret.map((r) => r.data))
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
