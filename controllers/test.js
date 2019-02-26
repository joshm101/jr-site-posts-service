const dbConnect = require('../bin/utils/db-connect')

// Connec to DB before any tests run.
before(done => {
  console.log('Connecting to database to run tests.')
  dbConnect()
    .then(() => done())
    .catch(error => process.exit(1))
})

// Make sure process exits after all tests are done running
after(() => process.exit(0))
