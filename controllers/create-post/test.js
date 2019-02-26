const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../bin/www')
const PostType = require('../../models/PostType')
const Post = require('../../models/Post')

chai.use(chaiHttp)
const { expect } = chai

let type = ''

const createPostRequest = data => {
  return chai.request(server)
    .post('/api/posts')
    .send({
      title: data.title,
      description: data.description,
      images: data.images,
      thumbnailImage: data.thumbnailImage,
      embedContent: data.embedContent,
      featured: data.featured,
      type: data.type || type
    })
}

describe('create post', () => {
  beforeEach(done => {
    const query = PostType.create({ name: 'default' })

    query.then(postType => {
      type = postType._id
      done()
    }).catch(console.log)
  })

  it('can save a post', done => {
    createPostRequest({
      title: 'test-post',
      description: 'test post description',
      images: [],
      thumbnailImage: 'test-thumbnail',
      embedContent: '',
      featured: false,
      type
    }).then(res => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.have.property('title')
      expect(res.body.data.title).to.equal('test-post')
      done()
    }).catch(error => console.log)
  })

  it('does not save a post if a title is not specified', done => {
    createPostRequest({
      description: 'test post description',
      images: [],
      thumbnailImage: 'test-thumbnail',
      embedContent: '',
      featured: false,
      type
    }).then(res => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  it('does not save a post if a thumbnail image is not specified', done => {
    createPostRequest({
      title: 'test-title',
      description: 'test post description',
      images: [],
      thumbnailImage: '',
      embedContent: '',
      featured: false,
      type
    }).then(res => {
      expect(res.status).to.equal(400)
      done()
    })
  })

  afterEach(done => {
    const queryPostTypes = PostType.deleteMany({})
    const queryPosts = Post.deleteMany({})

    Promise.all([queryPostTypes, queryPosts]).then(() => done())
  })
})
