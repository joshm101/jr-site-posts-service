const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

const server = require('../../bin/www')
const Post = require('../../models/Post')
const PostType = require('../../models/PostType')

chai.use(chaiHttp)
const { expect } = chai

let postTypeId = ''
let postId = ''
const images = ['image-1.jpg', 'image-2.jpg']
const thumbnailImage = 'some-thumbnail-image.jpg'
const postTitle = 'test-post-title'
const stubbedTypeId = mongoose.Types.ObjectId()

const seedDatabase = done => {
  PostType.create({
    name: 'test-post-type'
  }).then(postType => {
    Post.create([
      {
        title: postTitle,
        type: postType._id,
        images,
        thumbnailImage
      },
      {
        title: 'other-post-title',
        type: stubbedTypeId,
        images: ['image-3.jpg'],
        thumbnailImage: 'thumbnail-2.jpg'
      }
    ]).then(posts => {
      postTypeId = postType._id
      postId = posts[0]._id
      done()
    })
  })
}

const getPostsRequest = (queryParams = '') => (
  chai.request(server)
    .get(`/api/posts${queryParams}`)
    .send()
)

describe('get posts', () => {
  before(seedDatabase)

  it('returns an array of posts', () => {
    getPostsRequest()
      .then(res => {
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.instanceof(Array)
      })
  })

  it('filters by post title', done => {
    const queryParams = `?title=${postTitle}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.be.instanceof(Array)
      expect(res.body.data).to.have.length(1)
      expect(res.body.data[0].title).to.equal(postTitle)
      done()
    })
  })

  it('filters by image', done => {
    const queryParams = `?image=${images[0]}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.be.instanceof(Array)
      expect(res.body.data).to.have.length(1)
      expect(res.body.data[0].images).to.contain(images[0])
      done()
    })
  })

  it('filters by thumbnail', done => {
    const queryParams = `?thumbnail=${thumbnailImage}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.be.instanceof(Array)
      expect(res.body.data).to.have.length(1)
      expect(
        res.body.data[0].thumbnailImage
      ).to.equal(thumbnailImage)
      done()
    })
  })

  it('filters by type', done => {
    const queryParams = `?type=${postTypeId.toString()}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.be.instanceof(Array)
      expect(res.body.data).to.have.length(1)
      expect(
        res.body.data[0].type.toString()
      ).to.equal(postTypeId.toString())
      done()
    })
  })

  it('filters by ID', done => {
    const queryParams = `?id=${postId.toString()}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.be.instanceof(Array)
      expect(res.body.data).to.have.length(1)
      expect(
        res.body.data[0]._id.toString()
        ).to.equal(postId.toString())
      done()
    })
  })
})
