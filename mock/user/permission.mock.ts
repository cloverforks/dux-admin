import { defineAPIMock, send } from '../util'

export default defineAPIMock({
  url: '/permission',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        list: {
          article: ['list', 'create', 'edit', 'delete'],
          category: ['list', 'create', 'edit', 'delete'],
          user: ['list', 'create', 'edit', 'delete'],
          role: ['list', 'create', 'edit', 'delete'],
          setting: ['list', 'edit'],
        },
      })
    )
  },
})
