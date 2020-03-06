const request = require('supertest')
const app = require('../app')
describe('Endpoint tests', () => {
  it('isalive works', async () => {
    const res = await request(app).get('/isalive')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'up')
  })
})
