const Event = use('Event')
const Mail = use('Mail')

Event.on('forgot::password', async (data) => {
  await Mail.send('resetPasswordEmail', ({ token: data.ShortSafeToken }), (message) => {
    message.to('shaoyuan.weng@gmail.com')
    message.from('DesignNet@email.com')
  })
})
