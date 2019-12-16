'use strict'

class StorePost {
  get sanitizationRules() {
    return {
      title: 'escape|trim',
      description: 'escape|trim'
    }
  }
  get rules () {
    return {
      title: 'required|max:20|unique:posts',
      description: 'required'
    }
  }
  get messages () {
    return {
      'title.required': 'You must provide a title.',
      'description.required': 'You must provide a description.',
      'title.unique': 'Title already existed'
    }
  }
  async fails (errorMessages) {
    console.log(errorMessages)
    this.ctx.session.flash({notification: errorMessages[0].message})
    return this.ctx.response.redirect('back')
  }
}

module.exports = StorePost
