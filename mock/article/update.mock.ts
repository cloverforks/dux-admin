import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { Article } from 'mock/data'

export default defineAPIMock({
  url: '/article/:id',
  method: 'POST',
  response(req, res) {
    const data = req.body
    const result = validate(data, {
      title: 'Article title is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    const id = parseInt(req.params.id)
    Database.value().editArticle({ ...data, id: id } as Article)
    res.end(send(200, 'success'))
  },
})
