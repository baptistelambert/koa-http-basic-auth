const request = require('supertest')
const assert = require('assert')
const basicAuth = require('..')
const Koa = require('koa')

describe('koa-http-basic-auth', () => {
  describe('setup', () => {
    it('should throw an error when called with no user option', () => {
      assert.throws(() => {
        basicAuth({ pass: 'pass' })
      })
    })

    it('should throw an error when called with no pass option', () => {
      assert.throws(() => {
        basicAuth({ user: 'user' })
      })
    })
  })

  describe('with no credentials', () => {
    it('should have status 401', () => {
      const app = new Koa()

      app.use(basicAuth({ user: 'user', pass: 'pass' }))

      request(app.listen())
        .get('/')
        .expect(401)
    })
  })

  describe('with invalid credentials', () => {
    it('should have status 401', () => {
      const app = new Koa()

      app.use(basicAuth({ user: 'user', pass: 'pass' }))

      request(app.listen())
        .get('/')
        .auth('foo', 'bar')
        .expect(401)
    })
  })

  describe('with valid credentials', () => {
    it('should call the next middleware', () => {
      const app = new Koa()

      app.use(basicAuth({ user: 'user', pass: 'pass' }))
      app.use(ctx => {
        ctx.body = 'Protected'
      })

      request(app.listen())
        .get('/')
        .auth('user', 'pass')
        .expect(200)
        .expect('Protected')
    })
  })
})
