const express = require('express')
const getPosts = require('../../controllers/get-posts')
const getPostTypes = require('../../controllers/get-post-types')
const createPost = require('../../controllers/create-post')
const deletePost = require('../../controllers/delete-post')

const apiRouter = express.Router()

const root = (req, res) => {
  res.send('jr-site-posts microservice API')
}


apiRouter.get('/posts', getPosts)
apiRouter.post('/posts', createPost)
apiRouter.delete('/posts/:postId', deletePost)
apiRouter.get('/post-types', getPostTypes)
apiRouter.get('/', root)

module.exports = apiRouter
