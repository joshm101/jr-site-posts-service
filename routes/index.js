const express = require('express')
const router = express.Router()

const apiRouter = require('./api')

const root = (req, res) => {
  res.send('jr-site-posts microservice')
}

router.use((req, res, next) => {
  // Set CORS headers
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allowed-Methods', 'GET, POST, PUT, DELETE')
  res.append(
    'Access-Control-Allow-Headers',
    ['Content-Type', 'Authorization']
  )

  next()
})

router.use('/api', apiRouter)
router.use('/', root)

module.exports = router
