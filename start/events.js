const Event = use('Event')
const Mail = use('Mail')

Event.on('forgot::password', async (data) => {
  Newdata = JSON.parse(JSON.stringify(data))
  await Mail.send('resetPasswordEmail', ({ data: Newdata }), (message) => {
    message.to('shaoyuan.weng@gmail.com')
    message.from('from@email')
  })
})