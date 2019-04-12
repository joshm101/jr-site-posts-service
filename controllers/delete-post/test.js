const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const Post = require('../../models/Post')
const PostType = require('../../models/PostType')

chai.use(chaiHttp)
const { expect } = chai

let id = ''

const deletePostRequest = postId => {
  return chai.request(server).delete(`/api/posts/${postId}`)
}

describe('delete post', () => {
  before(done => {
    // before tests run, create post to use for testing
    const createPostQuery = Post.create({ title: 'test' })

    createPostQuery.then(post => {
      id = post._id
      done()
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
})
