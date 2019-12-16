'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Database = use('Database')
const Drive = use('Drive')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth, view }) {
    const UserData = await Database.table('users').select('*').where('email', auth.user.email)
    const PostData = await Database.table('posts').select('*').where('user_id', UserData[0].id)
    const data = {}
    data.email = UserData[0].email
    data.username = UserData[0].username
    data.address = UserData[0].address
    data.phone = UserData[0].phone
    data.display = 'post'
    data.post = PostData
    return view.render('profile', data)
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, session, request, response }) {
    const body = {}
    let imageCheck = ''
    request.multipart.field((name, value) => {
      body[name] = value
    })
    request.multipart.file('image', {}, async (file) => {
      imageCheck = file.extname
      await Drive.disk('s3').put(`${body.title}.${file.extname}`, file.stream)
    })
    await request.multipart.process()
    if (imageCheck === '') {
      session.flash({ notification: 'You have to upload an image' })
      return response.redirect('/profile')
    }
    if (body.title === '') {
      session.flash({ notification: 'You have to enter a title' })
      return response.redirect('/profile')
    }
    if (body.description === '') {
      session.flash({ notification: 'You have to enter a description' })
      return response.redirect('/profile')
    }
    const PostData = await Database.table('posts').select('*').where('title', body.title)
    if (PostData.length !== 0) {
      session.flash({ notification: 'Title already existed' })
      return response.redirect('/profile')
    }
    const date = new Date()
    const user = await User.findBy('email', auth.user.email)
    user.posts().insert({ title: body.title, description: body.description, user_id: user.id, author: user.username, date: date })
    session.flash({ notification: 'You have created a post' })
    return response.redirect('/profile')
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const data = {}
    const PostData = await Database.table('posts').select('*').where('id', params.id)
    if (PostData[0]) {
      data.title = PostData[0].title
      data.description = PostData[0].description
      data.id = params.id
      data.display = 'postEdit'
      return view.render('profile', data)
    } else {
      response.redirect('back')
    }
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, session, request, response }) {
    const date = new Date()
    const data = request.only(['title', 'description'])
    await Database.table('posts').where('id', params.id).update({ title: data.title, description: data.description, date: date })
    session.flash({ notification: 'modification succeeded' })
    response.redirect('/posts')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ session, params, request, response }) {
    await Database.table('posts').select('*').where('id', params.id).del()
    session.flash({ notification: 'delete succeeded' })
    response.redirect('/posts')
  }
}

module.exports = PostController
