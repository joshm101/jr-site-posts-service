const Post = require('../models/Post')
const PostType = require('../models/PostType')
const {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
  buildDBPagingParams
} = require('./build-db-paging-params')

const writePostToDatabase = (data, _id) => (
  _id ? (
    Post.updateOne({ _id }, data)
  ): Post.create(data)
)

const postTypeValid = typeId => {
  const query = PostType.findById(typeId)
  const queryPromise = query.exec()

  return queryPromise.then(postType => {
    if (!postType) {
      // post type with ID of typeId not found,
      // throw errror
      throw new Error('Invalid post type')
    }
  })
}

const extractPostData = reqBody => {
  const {
    title,
    description,
    images,
    thumbnailImage,
    embedContent,
    featured,
    type
  } = reqBody

  return {
    title,
    description,
    images,
    thumbnailImage,
    embedContent,
    featured,
    type
  }
}

const validatePostData = data => {
  const { title, thumbnailImage } = data
  const errors = []
  let error = {}

  if (!title) {
    error = { message: 'A post must have a title' }
    errors.push(error)
  }

  if (!thumbnailImage) {
    error = { message: 'A post must have a thumbnail image' }
    errors.push(error)
  }

  return errors
}

module.exports = {
  writePostToDatabase,
  extractPostData,
  postTypeValid,
  validatePostData,
  buildDBPagingParams,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE
}
