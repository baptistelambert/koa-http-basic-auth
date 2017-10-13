const assert = require('assert')
const basicAuth = require('basic-auth')

const unauthorized = (ctx, realm = 'Authorization required') => {
  ctx.set('WWW-Authenticate', `Basic realm=${realm}`)
  ctx.status = 401
}

/**
 * Itinialize basic auth middleware with given `opts`:
 *
 * - `user` username for basic authentication, required
 * - `pass` password for basic authentication, required
 * - `realm` realm for scope of protection indication, optional
 *
 * @param {Object} opts 
 * @return {Function}
 * @api public
 */
const basicAuthMiddleware = (opts = {}) => {
  assert(opts.user, 'user option required')
  assert(opts.pass, 'pass option required')

  return (ctx, next) => {
    const user = basicAuth(ctx)

    if (!user || !user.name || !user.pass) {
      return unauthorized(ctx, opts.realm)
    }

    if (user.name === opts.user && user.pass === opts.pass) {
      return next()
    }

    return unauthorized(ctx, opts.realm)
  }
}

module.exports = basicAuthMiddleware
