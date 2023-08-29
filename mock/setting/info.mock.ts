import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/setting',
  method: 'GET',
  response(req, res) {
    res.end(
      send(200, 'success', {
        info: Database.value().oneSetting(),
      })
    )
  },
})
