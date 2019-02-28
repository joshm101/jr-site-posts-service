const PostType = require('../../models/PostType')

const MAX_POST_TYPES = 4

const checkCurrentPostTypes = (postTypes, postTypeName) => {
  const errors = []
  if (postTypes.length === MAX_POST_TYPES) {
    errors.push({
      message: (
        `You may only have up to ${MAX_POST_TYPES} post types`
      )
    })

    // don't proceed with rest of validation if we are already
    // at max posts anyway
    return errors
  }

  // check if name is already in use
  const duplicate = postTypes.find(postType =>
    postType.name === postTypeName
  )

  if (duplicate) {
    errors.push({
      message: (
        `The post type name, ${postTypeName}, is already in use`
      )
    })
  }

  return errors
}

const createPostType = (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).send({
      errors: [{ message: 'Post type must have a name' }],
      message: 'Could not create post type'
    })
  }

  return PostType.find({}).then(postTypes => {

    // make sure we aren't already at max # of post types allowed
    const errors = checkCurrentPostTypes(postTypes, name)
    if (errors.length) {
      return res.status(400).send({
        errors,
        message: 'Could not create post type'
      })
    }

    PostType.create({ name }).then(postType =>
      res.status(200).send({ data: postType })
    ).catch(error =>
      res.status(500).send({
        message: 'Could not create post type'
      })
    )
  })
}

module.exports = createPostType
