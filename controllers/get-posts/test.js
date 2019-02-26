const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')

chai.use(chaiHttp)
const { expect } = chai

const getPostsRequest = () => (
  chai.request(server)
    .get('/api/posts')
    .send()
)

describe('get posts', () => {
  it('returns an array of posts', () => {
    getPostsRequest()
      .then(res => {
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.instanceof(Array)
      })
  })
})
