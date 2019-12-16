'use strict'

const Drive = use('Drive')

class UploadController {
  async upload ({ request, session, params, response }) {
    request.multipart.file('image', {}, async (file) => {
      await Drive.disk('s3').put(`${params.title}.${file.extname}`, file.stream)
    })
    await request.multipart.process()
    session.flash({ notification: 'Image upload succeeded' })
    return response.redirect('/profile')
  }
}

module.exports = UploadController
