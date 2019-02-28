const Post = require('../models/Post')
const PostType = require('../models/PostType')

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

const extractPostData = reqBody => (
  {
    title,
    description,
    images,
    thumbnailImage,
    embedContent,
    featured,
    type
  } = reqBody
)

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
  validatePostData
}
