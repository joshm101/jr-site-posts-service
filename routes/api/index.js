const express = require('express')
const getPosts = require('../../controllers/get-posts')
const getPostTypes = require('../../controllers/get-post-types')
const createPost = require('../../controllers/create-post')
const deletePost = require('../../controllers/delete-post')
const updatePost = require('../../controllers/update-post')
const updatePostType = require('../../controllers/update-post-type')
const createPostType = require('../../controllers/create-post-type')

const apiRouter = express.Router()

const root = (req, res) => {
  res.send('jr-site-posts microservice API')
}


apiRouter.get('/posts', getPosts)
apiRouter.post('/posts', createPost)
apiRouter.delete('/posts/:postId', deletePost)
apiRouter.put('/posts/:postId', updatePost)
apiRouter.get('/post-types', getPostTypes)
apiRouter.put('/post-types/:postTypeId', updatePostType)
apiRouter.post('/post-types/', createPostType)
apiRouter.get('/', root)

module.exports = apiRouter
