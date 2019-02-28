const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const PostType = require('../../models/PostType')

chai.use(chaiHttp)
const { expect } = chai

const createPostTypeRequest = data => (
  chai.request(server)
    .post('/api/post-types')
    .send({
      name: data.name
    })
)

describe('create post type', () => {
  beforeEach(done => {
    // before tests run, create post types for use in testing
    const names = ['test1', 'test2', 'test3']

    const queries = names.map(name =>
      PostType.create({ name })
    )

    Promise.all(queries).then(() => done()).catch(console.log)
  })

  it('can create a post type', done => {
    const data = { name: 'test4' }

    createPostTypeRequest(data).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('data')
      done()
    })
  })

  it('ensures you don\'t create more than max allowed post types', done => {
    const dataOne = { name: 'test4' }
    const dataTwo = { name: 'test5' }

    createPostTypeRequest(dataOne).then(res => {
      expect(res.status).to.equal(200)

      createPostTypeRequest(dataTwo).then(res => {
        expect(res.status).to.equal(400)
        expect(res.body).to.have.property('errors')
        expect(res.body).to.have.property('message')
        done()
      })
    })
  })

  it('enforces post type name uniqueness', done => {
    const data = { name: 'test3' }

    createPostTypeRequest(data).then(res => {
      expect(res.status).to.equal(400)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.length(1)
      done()
    })
  })

  afterEach(done => {
    PostType.deleteMany({}).then(() => done()).catch(console.log)
  })
})
