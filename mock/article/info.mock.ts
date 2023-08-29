import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/article/:id',
  method: 'GET',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = Database.value().oneArticle(id)
    if (data) {
      res.end(
        send(200, 'success', {
          info: data,
        })
      )
    } else {
      req.statusCode = 404
      res.end()
    }
  },
})
