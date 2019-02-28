const PostType = require('../../models/PostType')

const {
  writePostToDatabase,
  postTypeValid,
  extractPostData,
  validatePostData
} = require('../../utils')

const createPost = (req, res) => {
  const postData = extractPostData(req.body)
  const { type } = postData
  const errors = validatePostData(postData)
  if (errors.length) {
    const payload = {
      errors: errors.map(error => error.message),
      message: 'Could not save post'
    };

    return res.status(400).send(payload)
  }

  // TODO: JWT validation, access user info from JWT

  postTypeValid(type).then(() => {
    return writePostToDatabase(postData).then(post =>
      res.status(200).send({ data: post })
    ).catch(error =>
      res.status(500).send('Could not save post')
    )
  }).catch(error =>
    // postTypeValid util threw error indicating that
    // an invalid post type was specified
    res.status(400).send('Invalid post type specified')
  )
}

module.exports = createPost
