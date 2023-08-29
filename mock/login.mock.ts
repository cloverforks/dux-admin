import { defineAPIMock, send } from './util'
import Database from './mockData'

export default defineAPIMock({
  url: '/login',
  method: 'POST',
  response(req, res) {
    const users = Database.value().listUsers()
    const roles = Database.value().listRoles()
    const { body } = req
    const user = users.find((a) => a.username === body?.username)
    if (!user || user.password != body?.password) {
      res.statusCode = 500
      res.end(send(500, 'Username or password is incorrect'))
      return
    }
    const role = roles.find((a) => a.id === user.role_id)
    if (!role) {
      res.statusCode = 500
      res.end(send(500, 'Role is not found'))
      return
    }

    const str = JSON.stringify({
      username: user.username,
      password: user.password,
    })
    const buff = Buffer.from(str, 'utf-8')
    const token = buff.toString('base64')

    res.statusCode = 200
    res.end(
      send(200, 'success', {
        userInfo: {
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          role_name: role.name,
        },
        token: token,
        permission: role.permission,
      })
    )
  },
})
