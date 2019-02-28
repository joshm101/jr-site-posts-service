const Post = require('../models/Post')
const PostType = require('../models/PostType')

const writePostToDatabase = data => (
  data._id ? (
    Post.update({ _id: data._id }, data)
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

const getPostDataFromReqBody = reqBody => (
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

module.exports = {
  writePostToDatabase,
  getPostDataFromReqBody,
  postTypeValid
}
