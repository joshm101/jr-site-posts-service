const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const PostType = require('../../models/PostType')
const Post = require('../../models/Post')

chai.use(chaiHttp)
const { expect } = chai

let firstPostTypeId = ''
let secondPostTypeId = ''

const deletePostTypeRequest = postTypeId => {
  return chai.request(server).delete(`/api/post-types/${postTypeId}`)
}

describe('delete post type', () => {
  before(done => {
    // before tests run, create post and post types to use in testing
    const createPostTypeQueries = [
      PostType.create({ name: 'post-type-1' }),
      PostType.create({ name: 'post-type-2' })
    ]


    Promise.all(createPostTypeQueries).then(
      ([firstPostType, secondPostType]) => {
        firstPostTypeId = firstPostType._id
        secondPostTypeId = secondPostType._id

        const createPostQuery = Post.create({
          title: 'some-post-title',
          thumbnailImage: 'test.jpg',
          type: firstPostTypeId
        })

        createPostQuery.then(() => done())
      }
    )
  })

  it('can delete post type', done => {
    deletePostTypeRequest(secondPostTypeId).then(res => {
      expect(res.status).to.equal(200)
      done()
    })
  })

  it('does not delete a post type if it\'s in use', done => {
    deletePostTypeRequest(firstPostTypeId).then(res => {
      expect(res.status).to.equal(400)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.length(1)
      done()
    })
  })

  after(done => {
    const queries = [
      Post.deleteMany({}),
      PostType.deleteMany({})
    ]

    Promise.all(queries).then(() => done())
  })
})

