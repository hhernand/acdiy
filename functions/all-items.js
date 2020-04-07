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
          q.Match(q.Index('all_items')),
          q.Index('items_sort_by_name_asc')
        ),
        { size: 5000 }
      )
    )
    .then((response) => {
      const refs = response.data
      const toQuery = refs.map((ref) => {
        return q.Get(ref[1])
      })
      return client.query(toQuery).then((ret) => {
        const result = {
          indexed: {},
          ordered: []
        }
        ret.forEach((r, i) => {
          const ref = r.ref
            .toString()
            .split(', "')[1]
            .split('"')[0]
          result.indexed[ref] = {
            ref,
            ...r.data
          }

          result.ordered.push({
            ref,
            ...r.data
          })
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
