import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { Role } from 'mock/data'

export default defineAPIMock({
  url: '/role/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)

    const data = req.body
    const result = validate(data, {
      name: 'Role name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    Database.value().editRole({ ...data, id: id } as Role)
    res.end(send(200, 'success'))
  },
})
