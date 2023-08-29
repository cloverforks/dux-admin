import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/user/:id',
  method: 'GET',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = Database.value().oneUser(id)
    if (data) {
      data.password = ''
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
