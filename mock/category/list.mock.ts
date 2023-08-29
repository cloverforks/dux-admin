import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/category',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        list: Database.value().listCategories(),
      })
    )
  },
})
