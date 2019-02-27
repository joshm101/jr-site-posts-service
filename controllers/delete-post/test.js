const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const Post = require('../../models/Post')
const PostType = require('../../models/PostType')

chai.use(chaiHttp)
const { expect } = chai

let id = ''
let type = ''

const deletePostRequest = postId => {
  return chai.request(server).delete(`/api/posts/${postId}`)
}

describe('delete post', () => {
  beforeEach(done => {
    const query = PostType.create({ name: 'default' })

    query.then(postType => {
      type = postType._id
    }).then(() => {
      const createPostQuery = Post.create({ title: 'test', type })

      createPostQuery.then(post => {
        id = post._id
        done()
      })
    }).catch(console.log)
  })

  it('can delete a post', done => {
    deletePostRequest(id).then(res => {
      expect(res.status).to.equal(200)
      done()
    }).catch(error => console.log)
  })

  it('returns 400 when an invalid post ID is provided', done => {
    deletePostRequest('invalid-id').then(res => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  after(done => {
    const query = Post.deleteMany({})

    query.then(() => done())
  })
})
