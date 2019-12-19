'use strict'

class UpdateUser {
  get sanitizationRules () {
    return {
      email: 'normalizeEmail',
      username: 'escape|trim',
      phone: 'escape|trim',
      address: 'escape|trim'
    }
  }

  get rules () {
    return {
      email: 'required|email|unique:users,email',
      address: 'required',
      phone: 'required',
      username: 'required'
    }
  }

  async fails (errorMessages) {
    console.log(errorMessages)
    this.ctx.session.flash({ notification: errorMessages[0].message })
    return this.ctx.response.redirect('back')
  }
}

module.exports = UpdateUser
