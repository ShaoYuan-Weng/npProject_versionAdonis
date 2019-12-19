'use strict'
const Persona = use('Persona')
const Database = use('Database')
const Hash = use('Hash')
const Event = use('Event')

class LoginController {
  async login ({ request, session, auth, response }) {
    const payload = request.only(['uid', 'password'])
    console.log(request.post())
    const user = await Persona.verify(payload)
    await auth.login(user)
    session.flash({ notification: 'Loggin succeed' })
    response.redirect('/profile')
  }

  async logout ({ auth, session, response }) {
    await auth.logout()
    session.flash({ notification: 'Logged out' })
    response.redirect('/')
  }

  async forgetForm ({ view }) {
    return view.render('forget', { navbar: 'login' })
  }

  async forget ({ request, session, response }) {
    const UserData = await Database.table('users').select('*').where('email', request.post().uid)
    if (UserData.length === 0) {
      session.flash({ notification: 'User not found' })
      return response.redirect('back')
    }

    const safeToken = await Hash.make(request.post().uid)
    const ShortSafeToken = safeToken.substring(0, 10)
    await Database.table('tokens').where('user_id', UserData[0].id).update('token', ShortSafeToken)
    Event.fire('forgot::password', { ShortSafeToken })
    session.flash({ notification: 'Password retrieve mail sent' })
    return response.redirect('/')
  }

  async resetForm ({ params, session, response, view }) {
    const TokenData = await Database.table('tokens').select('*').where('token', params.token)
    if (TokenData.length === 0) {
      session.flash({ notification: 'Weird...' })
      return response.redirect('/')
    }
    return view.render('passwordResetFormToken', { token: params.token, navbar: 'login' })
  }

  async reset ({ params, session, request, response }) {
    const TokenData = await Database.table('tokens').select('*').where('token', params.token)
    if (TokenData.length !== 0) {
      const PasswordHashed = await Hash.make(request.post().password)
      await Database.table('users').where('id', TokenData[0].user_id).update('password', PasswordHashed)
      session.flash({ notification: 'password reset succeeded' })
      return response.redirect('/')
    } else {
      session.flash({ notification: 'something wrong...' })
      return response.redirect('back')
    }
  }

  async changeShow ({ view, params }) {
    return view.render('passwordResetForm', { username: params.username })
  }

  async change ({ request, session, params, auth, response }) {
    const payload = request.only(['old_password', 'password', 'password_confirmation'])
    const user = auth.user
    await Persona.updatePassword(user, payload)
    session.flash({ notification: 'Password change succeeded' })
    response.redirect('/profile')
  }
}

module.exports = LoginController
