const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')

const server = require('../../bin/www')
const Post = require('../../models/Post')
const PostType = require('../../models/PostType')
const { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } = require('../../utils')

chai.use(chaiHttp)
const { expect } = chai

let postTypeId = ''
let postId = ''
const images = ['image-1.jpg', 'image-2.jpg']
const thumbnailImage = 'some-thumbnail-image.jpg'
const postTitle = 'test-post-title'
const stubbedTypeId = mongoose.Types.ObjectId()

const getSeedPosts = () => [
  {
    title: postTitle,
    type: postTypeId,
    images,
    thumbnailImage
  },
  {
    title: 'other-post-title',
    type: stubbedTypeId,
    images: ['image-3.jpg'],
    thumbnailImage: 'thumbnail-2.jpg'
  }
]

const seedDatabase = () => {
  return PostType.create({
    name: 'test-post-type'
  }).then(postType => {
    postTypeId = postType._id
    return Post.create(getSeedPosts()).then(posts => {
      postId = posts[0]._id
    })
  })
}

const clearDatabase = () => Promise.all([
  Post.deleteMany({}),
  PostType.deleteMany({})
])

const getPostsRequest = (queryParams = '') => (
  chai.request(server)
    .get(`/api/posts${queryParams}`)
    .send()
)

describe('get posts', () => {
  // clear database because paging tests partially rely on data set size
  before(() => clearDatabase().then(seedDatabase))

  it('returns an array of posts', () => {
    getPostsRequest()
      .then(res => {
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.instanceof(Array)
      })
  })

  it('provides paging meta data', done => {
    getPostsRequest().then(res => {
      expect(res.body).to.have.property('meta')
      expect(res.body.meta).to.have.property('page')
      expect(res.body.meta).to.have.property('pageSize')
      expect(res.body.meta).to.have.property('total')

      expect(res.body.meta.page).to.equal(DEFAULT_PAGE)
      expect(res.body.meta.pageSize).to.equal(DEFAULT_PAGE_SIZE)
      expect(res.body.meta.total).to.equal(getSeedPosts().length)
      done()
    })
  })

  it('returns correct page of data', done => {
    const page = 1
    const pageSize = 1
    const queryParams = `?page=${page}&pageSize=${pageSize}`

    getPostsRequest(queryParams).then(res => {
      expect(res.body.data).to.have.length(pageSize)
      expect(res.body.meta.page).to.equal(page)
      expect(res.body.meta.pageSize).to.equal(pageSize)
      expect(res.body.meta.total).to.equal(getSeedPosts().length)
      done()
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
