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

  PostType.find({}).then(postTypes => {
    // look for any post type with name matching
    // name from request body
    const duplicate = postTypes.find(postType =>
      postType.name === name
    )

    if (duplicate) {
      // name from request body already in use
      return res.status(400).send({
        errors: [
          { message: `The post type name, ${name}, is already in use` }
        ],
        message: 'Could not update post type'
      })
    }

    // valid request body, write update to database
    PostType.updateOne({
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
  })
}

module.exports = updatePostType
