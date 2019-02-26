const express = require('express')
const getPosts = require('../../controllers/get-posts')
const getPostTypes = require('../../controllers/get-post-types')

const apiRouter = express.Router()

const root = (req, res) => {
  res.send('jr-site-posts microservice API')
}


apiRouter.get('/posts', getPosts)
apiRouter.get('/post-types', getPostTypes)
apiRouter.get('/', root)

module.exports = apiRouter
