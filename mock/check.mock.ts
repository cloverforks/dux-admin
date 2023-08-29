import { defineAPIMock, send } from './util'
import Database from './mockData'

export default defineAPIMock({
  url: '/check',
  method: 'POST',
  response(req, res) {
    const users = Database.value().listUsers()
    const { body } = req
    if (!body?.token) {
      res.statusCode = 500
      res.end(send(500, 'Token is empty'))
      return
    }
    const buff = Buffer.from(body.token, 'base64')
    const str = buff.toString('utf-8')
    const { username, password } = JSON.parse(str)
    const user = users.find((a) => a.username === username)
    if (!user || user.password !== password) {
      res.statusCode = 500
      res.end(send(500, 'Token is incorrect'))
      return
    }
    res.statusCode = 200
    res.end(send(200, 'success'))
  },
})
