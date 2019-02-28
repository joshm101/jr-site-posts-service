const Post = require('../../models/Post')
const PostType = require('../../models/PostType')

const {
  extractPostData,
  validatePostData,
  postTypeValid,
  writePostToDatabase
} = require('../../utils')

const updatePost = (req, res) => {
  const postData = {
    ...extractPostData(req.body),
    updated: new Date()
  }
  const { type } = postData
  const { postId } = req.params
  const errors = validatePostData(postData)
  if (errors.length) {
    const payload = {
      errors: errors.map(error => error.message),
      message: 'Could not update post'
    }

    return res.status(400).send(payload)
  }

  // TODO: JWT validation, access user info from JWT

  postTypeValid(type).then(() => {
    return writePostToDatabase(postData, postId).then(post =>
      res.status(200).send({ data: post })
    ).catch(error =>
      // postTypeValid util threw error indicating that
      // an invalid post type was specified
      res.status(400).send({
        message: 'Invalid post type specified'
      })
    )
  })
}

module.exports = updatePost
