import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/user',
  method: 'GET',
  response(req, res) {
    const users = Database.value().listUsers()
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = users.slice(startIndex, endIndex)
    res.end(
      send(200, 'success', {
        list: data,
        total: users.length,
        Page: page,
      })
    )
  },
})
