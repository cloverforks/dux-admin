import { defineAPIMock, send, validate } from '../util'
import Database from '../mockData'
import { Category } from 'mock/data'

export default defineAPIMock({
  url: '/category/:id',
  method: 'POST',
  response(req, res) {
    const id = parseInt(req.params.id)
    const data = req.body

    const result = validate(data, {
      name: 'Category name is empty',
    })
    if (result !== true) {
      res.statusCode = 422
      res.end(result)
      return
    }
    const info = Database.value().oneCategory(id)

    Database.value().editCategory({ ...info, ...data } as Category)
    res.end(send(200, 'success'))
  },
})
