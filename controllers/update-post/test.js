const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const PostType = require('../../models/PostType')
const Post = require('../../models/Post')

chai.use(chaiHttp)
const { expect } = chai

let type = ''
let id = ''

const updatePostRequest = data => (
  chai.request(server)
    .put(`/api/posts/${id}`)
    .send({
      title: data.title,
      description: data.description,
      images: data.images,
      thumbnailImage: data.thumbnailImage,
      embedContent: data.embedContent,
      featured: data.featured,
      type: data.type || type,
    })
)

describe('update post', () => {
  before(done => {
    // before tests run, create post and post type for
    // use in testing
    const createPostTypeQuery = PostType.create({ name: 'default' })
    createPostTypeQuery.then(postType => {
      type = postType._id
    }).then(() => {
      // create post once post type has been created
      const createPostQuery = Post.create({ title: 'test', type })
      createPostQuery.then(post => {
        id = post._id
        done()
      })
    }).catch(console.log)
  })

  it('can save an update', done => {
    const update = {
      title: 'test update',
      description: 'test update description',
      thumbnailImage: '-update-thumbnail',
      embedContent: '-update-content',
      featured: true,
      type
    }

    updatePostRequest(update).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('data')
      done()
    }).catch(console.log)
  })
})
