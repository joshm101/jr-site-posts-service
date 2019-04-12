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
    // before test run, create post types for use in testing
    const firstPostTypeQuery = PostType.create({ name: 'testing' })
    const secondPostTypeQuery = PostType.create({ name: 'some-name' })

    Promise.all(
      [firstPostTypeQuery, secondPostTypeQuery]
    ).then(([firstPostType, _]) => {
      id = firstPostType._id
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

  it('enforces post type name uniqueness', done => {
    const update = { name: 'some-name' }

    updatePostTypeRequest(update).then(res => {
      expect(res.status).to.equal(400)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.length(1)
      done()
    })
  })
})
