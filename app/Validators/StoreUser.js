'use strict'

class StoreUser {
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
      password: 'required',
      password_confirmation: 'required',
      address: 'required',
      phone: 'required',
      username: 'required'
    }
  }
  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'username.required': 'You must provide a username.',
      'address.required': 'You must provide a address.',
      'phone.required': 'You must provide a phone.',
    }
  }
  async fails (errorMessages) {
    console.log(errorMessages)
    this.ctx.session.flash({notification: errorMessages[0].message})
    return this.ctx.response.redirect('back')
  }
}

module.exports = StoreUser
