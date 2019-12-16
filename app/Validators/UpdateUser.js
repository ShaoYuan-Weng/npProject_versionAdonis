'use strict'

class UpdateUser {
  get sanitizationRules() {
    return {
      email: 'normalizeEmail',
      username: 'escape|trim',
      phone: 'escape|trim',
      address: 'escape|trim'
    }
  }
  get rules() {
    return {
      email: 'required|email|unique:users,email',
      address: 'required',
      phone: 'required',
      username: 'required'
    }
  }
  async fails (errorMessages, {session, response}) {
    console.log(errorMessages)
    session.flash({notification: errorMessages})
    return response.redirect('back')
  }
}

module.exports = UpdateUser
