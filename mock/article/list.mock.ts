import { defineAPIMock, send } from '../util'
import Database from '../mockData'

export default defineAPIMock({
  url: '/article',
  method: 'GET',
  response(req, res) {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10

    let data = Database.value().listArticles()

    if (req.query?.keyword) {
      data = data.filter((v) => v.title.includes(req.query?.keyword))
    }

    if (req.query?.status == 1) {
      data = data.filter((v) => v.status)
    } else if (req.query?.status == 2) {
      data = data.filter((v) => !v.status)
    }

    if (req.query?.id_sort === 'asc') {
      data.sort((a, b) => a.id - b.id)
    } else if (req.query?.id_sort === 'desc') {
      data.sort((a, b) => b.id - a.id)
    }

    if (req.query?.created_at_sort === 'asc') {
      data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else {
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const list = data.slice(startIndex, endIndex)
    res.end(
      send(200, 'success', {
        list: list,
        total: data.length,
        Page: page,
      })
    )
  },
})
