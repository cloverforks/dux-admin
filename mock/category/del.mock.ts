import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/category/:id',
  method: 'DELETE',
  response(req, res) {
    const id = parseInt(req.params.id)
    Database.value().delCategory(id)
    res.end(send(200, 'success'))
  },
})
