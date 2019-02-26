const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')

chai.use(chaiHttp)
const { expect } = chai

const getPostTypesRequest = () => (
  chai.request(server)
    .get('/api/post-types')
    .send()
)

describe('get post types', () => {
  it('returns an array of post types', () => {
    getPostTypesRequest()
      .then(res => {
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.instanceof(Array)
      })
  })
})