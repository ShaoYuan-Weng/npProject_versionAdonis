'use strict'
const Persona = use('Persona')
const Database = use('Database')
const Hash = use('Hash')

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
    await Persona.forgotPassword(request.post().uid)
    // I realized that Persona generates "/" in tokens, which causes problems. So I make the token less longer
    const safeToken = await Hash.make(request.post().uid)
    await Database.table('tokens').where('user_id', UserData[0].id).update('token', safeToken.substring(0, 10))
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
    const token = params.token
    const payload = request.only(['password', 'password_confirmation'])
    try {
      const user = await Persona.updatePasswordByToken(token, payload)
      console.log(user)
      session.flash({ notification: 'Password changed successfully' })
      return response.redirect('/')
    } catch (err) {
      console.log(err)
      session.flash({ notification: 'Something wrong...' })
      return response.redirect('/')
    }
  }

  async changeShow ({ view, params }) {
    return view.render('passwordResetForm', { username: params.username })
  }

  async change ({ request, session, params, auth, response }) {
    const payload = request.only(['old_password', 'password', 'password_confirmation'])
    const user = auth.user
    try {
      await Persona.updatePassword(user, payload)
      session.flash({ notification: 'Password change succeeded' })
      response.redirect('/profile')
    } catch (err) {
      console.log(err)
      session.flash({ notification: err.messages[0].message })
      response.redirect(`/change/${params.username}`)
    }
  }
}

module.exports = LoginController
