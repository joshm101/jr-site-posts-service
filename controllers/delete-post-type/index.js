const PostType = require('../../models/PostType')
const Post = require('../../models/Post')

const getPosts = () => Post.find({ })

/**
 * Checks if a post type is in use by a post
 * @param {object} postType - Post type to check for usage
 * @return {Promise<boolean>} - true if any post's type property
 * references postType._id. false otherwise
 */
const getTypeInUseStatus = postType => new Promise(
  resolve => (
    getPosts().then(posts =>
      // look for any post whose type references postType._id
      resolve(
        posts.some(post =>
          post.type.toString() === postType._id
        )
      )
    )
  )
)

const deletePostType = (req, res) => {
  const postType = req.body
  const { postTypeId } = req.params

  getTypeInUseStatus(
    { ...postType, _id: postTypeId }
  ).then(typeInUse => {
    if (typeInUse) {
      // post type currently in use by a post, cannot delete
      const errors = [
        { message: 'There are posts assigned to this post type' }
      ];

      return res.status(400).send({
        errors,
        message: 'Could not delete post type'
      })
    }

    // post type is not in use by any posts so we can safely delete
    const deleteQuery = PostType.deleteOne({ _id: postTypeId })

    deleteQuery.exec().then(() =>
      res.status(200).send('')
    ).catch(() => {
      const errors = [
        { message: 'An unknown error occurred' }
      ]

      res.status(500).send({
        errors,
        message: 'Could not delete post type'
      })
    })
  })
}

module.exports = deletePostType

