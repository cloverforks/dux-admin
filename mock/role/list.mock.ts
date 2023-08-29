import { defineAPIMock, send } from '../util'
import database from '../mockData'
export default defineAPIMock({
  url: '/role',
  method: 'GET',
  response(req, res) {
    const roles = database.value().listRoles()
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const data = roles.slice(startIndex, endIndex)
    res.end(
      send(200, 'success', {
        list: data,
        total: roles.length,
        Page: page,
      })
    )
  },
})
