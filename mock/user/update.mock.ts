import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { User } from 'mock/data'

export default defineAPIMock({
  url: '/user/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = req.body
    const result = validate(data, {
      username: 'username is empty',
      nickname: 'username is empty',
      role_id: 'Role is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    const info = Database.value().oneUser(id)
    if (!data?.password) {
      data.password = info?.password
    }

    Database.value().editUser({ ...data, id: id } as User)

    res.end(send(200, 'success'))
  },
})
