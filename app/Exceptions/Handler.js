'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { session, response }) {
    if (error.name === 'InvalidSessionException') {
      session.flash({ notification: 'You have to login first' })
      await session.commit()
      response.redirect('/')
    }
    if (error.name === 'ValidationException') {
      session.flash({ notification: error.messages[0].message })
      await session.commit()
      response.redirect('/')
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
