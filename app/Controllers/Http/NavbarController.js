'use strict'

// check if user is logged
function logCheck (auth) {
  const data = {}
  auth.user ? data.navbar = 'profile' : data.navbar = 'login'
  return data
}

const Database = use('Database')

class NavbarController {
  async platform ({ auth, view }) {
    const PostData = await Database.table('posts').select('*').orderBy('date', 'desc')
    const data = logCheck(auth)
    data.post = PostData
    return view.render('platform', data)
  }

  async news ({ auth, view }) {
    return view.render('news', logCheck(auth))
  }

  async profile ({ auth, view }) {
    const Data = await Database.table('users').select('*').where('email', auth.user.email)
    const data = logCheck(auth)
    data.email = Data[0].email
    data.username = Data[0].username
    data.address = Data[0].address
    data.phone = Data[0].phone
    data.display = 'info'
    return view.render('profile', data)
  }

  async login ({ auth, view }) {
    return view.render('login', logCheck(auth))
  }

  async create ({ auth, view }) {
    return view.render('usercreate', logCheck(auth))
  }

  async post ({ params, session, auth, view, response }) {
    const PostData = await Database.table('posts').select('*').where('title', params.title)
    if (PostData[0]) {
      const data = logCheck(auth)
      data.title = PostData[0].title
      data.description = PostData[0].description
      data.author = PostData[0].author
      return view.render('post', data)
    } else {
      session.flash({ notification: 'Page not found' })
      response.redirect('back')
    }
  }
}

module.exports = NavbarController
