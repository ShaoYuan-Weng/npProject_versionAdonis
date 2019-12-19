const Event = use('Event')
const Mail = use('Mail')

Event.on('forgot::password', async (data) => {
  console.log(data)
  /*await Mail.send('resetPasswordEmail', ({ token: data.token }), (message) => {
    message.to('by04551@gmail.com')
    message.from('DesignNet@email.com')
  })*/
})
