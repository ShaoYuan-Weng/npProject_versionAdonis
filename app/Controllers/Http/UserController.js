'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const Persona = use('Persona')
const Database = use('Database')

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return response.redirect('back')
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, session, response }) {
    const payload = request.only(['email', 'password', 'password_confirmation'])
    const data = request.only(['address', 'phone', 'username'])
    try {
      await Persona.register(payload, () => {
        payload.address = data.address
        payload.phone = data.phone
        payload.username = data.username
        return payload
      })
      const payloadLogin = { uid: request.post().email, password: request.post().password }
      const user = await Persona.verify(payloadLogin)
      await auth.login(user)
      await session.flash({ notification: 'You have successfully created an account' })
      return response.redirect('/')
    } catch (err) {
      console.log(err)
      session.flash({ notification: err.messages[0].message })
      response.redirect('/create')
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, request, response }) {
    const payload = request.only(['email', 'username', 'phone', 'address'])
    const user = auth.user
    await Persona.updateProfile(user, payload)
    response.redirect('/profile')
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ session, auth, request, response }) {
    await Database.table('users').select('*').where('email', auth.user.email).del()
    await auth.logout()
    session.flash({ notification: 'We are sad to see you go...' })
    response.redirect('/')
  }
}

module.exports = UserController
