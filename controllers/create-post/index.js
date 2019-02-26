const Post = require('../../models/Post')
const PostType = require('../../models/PostType')

const postTypeValid = typeId => {
    const query = PostType.findById(typeId)
    const queryPromise = query.exec()

    return queryPromise
}

const writePostToDatabase = data => (
  Post.create(data)
)

const createPost = (req, res) => {
  const {
    title,
    description,
    images,
    thumbnailImage,
    embedContent,
    featured,
    type
  } = req.body;

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

  postTypeValid(type).then(_ => {  
    return writePostToDatabase({
      title,
      description,
      images,
      thumbnailImage,
      embedContent,
      featured,
      type,
    }).then(post =>
      res.status(200).send({ data: post })
    ).catch(error =>
      res.status(500).send('Could not save post')
    )
  }).catch(error =>
    res.status(400).send('Invalid post type specified')  
  )
}

module.exports = createPost
