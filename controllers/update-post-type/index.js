const PostType = require('../../models/PostType')

const updatePostType = (req, res) => {
  const { name } = req.body
  const { postTypeId } = req.params

  if (!name) {
    return res.status(400).send({
      errors: [{ message: 'Post type must have a name' }],
      message: 'Could not update post type'
    })
  }

  return PostType.updateOne({
    _id: postTypeId },
    { name }
  ).then(postType =>
    res.status(200).send({ data: postType })
  ).catch(error =>
    // error occurred while updating post type in DB
    res.status(500).send({
      message: 'Could not update post type'
    })
  )
}

module.exports = updatePostType
