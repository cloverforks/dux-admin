import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { Article } from 'mock/data'

export default defineAPIMock({
  url: '/article',
  method: 'POST',
  response(req, res) {
    const data = req.body

    const result = validate(data, {
      title: 'Article title is empty',
      category_id: 'Category is not select',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }

    Database.value().createArticle(data as Article)

    res.end(send(200, 'success'))
  },
})
