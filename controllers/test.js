const dbConnect = require('../bin/utils/db-connect')
const Post = require('../models/Post')
const PostType = require('../models/PostType')

// Connec to DB before any tests run.
before(done => {
  console.log('Connecting to database to run tests.')
  dbConnect()
    .then(() => done())
    .catch(error => process.exit(1))
})

// Make sure process exits after all tests are done running
after(done => {
  const queries = [
    Post.deleteMany({}),
    PostType.deleteMany({})
  ]

  Promise.all(queries).then(() => {
    done()
    process.exit(0)
  })
})
