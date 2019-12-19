const Event = use('Event')
const Mail = use('Mail')

Event.on('forgot::password', async (data) => {
  /*await Mail.send('resetPasswordEmail', ({ token: data.token }), (message) => {
    message.to('by04551@gmail.com')
    message.from('from@email')
  })*/
})
