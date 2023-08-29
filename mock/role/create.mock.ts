import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { Role } from 'mock/data'

export default defineAPIMock({
  url: '/role',
  method: 'POST',
  response(req, res) {
    const data = req.body
    const result = validate(data, {
      name: 'Role name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    Database.value().createRole(data as Role)
    res.end(send(200, 'success'))
  },
})
