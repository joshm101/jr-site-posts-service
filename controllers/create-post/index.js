const PostType = require('../../models/PostType')

const {
  writePostToDatabase,
  postTypeValid,
  getPostDataFromReqBody
} = require('../../utils')

const createPost = (req, res) => {
  const postData = getPostDataFromReqBody(req.body)
  const { title, thumbnailImage, type } = postData

  if (!title) {
    res.status(400).send({
      message: 'A post must have a title'
    })

    return
  }

  if (!thumbnailImage) {
    res.status(400).send({
      message: 'A post must have a thumbnail image'
    })

    return
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
