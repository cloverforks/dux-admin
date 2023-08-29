import { defineAPIMock, send } from './util'

export default defineAPIMock({
  url: '/upload',
  method: 'POST',
  response(req, res) {
    res.end(
      send(200, 'success', {
        list: [
          {
            url: 'https://picsum.photos/id/124/200/200',
            name: 'Image 1',
            ext: 'jpg',
            size: 1024,
            mime: 'image/jpeg',
          },
        ],
      })
    )
  },
})
