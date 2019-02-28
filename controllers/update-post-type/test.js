const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const PostType = require('../../models/PostType')

chai.use(chaiHttp)
const { expect } = chai

let id = ''

const updatePostTypeRequest = data => (
  chai.request(server)
    .put(`/api/post-types/${id}`)
    .send({
      name: data.name
    })
)

describe('update post type', () => {
  before(done => {
    // before test run, create post type for use in testing
    const createPostTypeQuery = PostType.create({ name: 'testing' })
    createPostTypeQuery.then(postType => {
      id = postType._id
      done()
    })
  })

  it('can save an update', done => {
    const update = { name: 'testing update' }

    updatePostTypeRequest(update).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('data')
      done()
    }).catch(console.log)
  })

  it('validates post type data', () => {
    const update = { }

    updatePostTypeRequest(update).then(res => {
      expect(res.status).to.equal(400)
    })
  })
})
