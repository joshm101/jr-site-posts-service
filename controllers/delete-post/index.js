const Post = require('../../models/Post')

const deletePost = (req, res) => {
  const { postId } = req.params

  if (!postId) {
    res.status(400).send({
      message: 'ID of post to delete is required'
    })
  }

  // TODO: JWT validation

  Post.findById(postId).then(post => {
    if (!post) {
      res.status(400).send({
        message: 'Invalid post ID'
      })
      return
    }

    Post.deleteOne({ _id: postId }).then(() =>
      res.status(200).send()
    ).catch(error =>
      res.status(500).send({ message: 'Could not delete post' })
    )
  }).catch(() =>
    // error when finding post with this ID --> invalid ID
    // assuming that given a valid ID, this catch block
    // will not be executed since a post will be found
    res.status(400).send({
      message: 'Invalid post ID'
    })
  )
}

module.exports = deletePost
