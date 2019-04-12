const mongoose = require('mongoose')

const validDevEnv = require('../valid-dev-env')
const validTestEnv = require('../valid-test-env')

const env = process.env.NODE_ENV || 'development'

console.log('env: ', env)

let MONGODB_CONNECTION_URI = ''
let MONGODB_CONNECTION_USERNAME = ''
let MONGODB_CONNECTION_PASSWORD = ''

const envValid = (
  (validDevEnv() && env === 'development') ||
  (validTestEnv() && env === 'test')
)

if (!envValid) {
  process.exit(1)
}

if (env === 'development' && envValid) {
  const {
    JR_SITE_DEV_DB_CONNECTION_URI,
    JR_SITE_DEV_DB_CONNECTION_USERNAME,
    JR_SITE_DEV_DB_CONNECTION_PASSWORD
  } = process.env

  MONGODB_CONNECTION_URI = JR_SITE_DEV_DB_CONNECTION_URI
  MONGODB_CONNECTION_USERNAME = JR_SITE_DEV_DB_CONNECTION_USERNAME
  MONGODB_CONNECTION_PASSWORD = JR_SITE_DEV_DB_CONNECTION_PASSWORD
}

if (env === 'test' && envValid) {
  const {
    JR_SITE_TEST_DB_CONNECTION_URI,
    JR_SITE_TEST_DB_CONNECTION_USERNAME,
    JR_SITE_TEST_DB_CONNECTION_PASSWORD
  } = process.env

  MONGODB_CONNECTION_URI = JR_SITE_TEST_DB_CONNECTION_URI
  MONGODB_CONNECTION_USERNAME = JR_SITE_TEST_DB_CONNECTION_USERNAME
  MONGODB_CONNECTION_PASSWORD = JR_SITE_TEST_DB_CONNECTION_PASSWORD
}

const CONNECTION_STRING = (
  `mongodb://${MONGODB_CONNECTION_USERNAME}:` +
  `${encodeURIComponent(MONGODB_CONNECTION_PASSWORD)}@` +
  `${MONGODB_CONNECTION_URI}`
)

module.exports = () => (
  mongoose.connect(
    CONNECTION_STRING,
    { useNewUrlParser: true }
  )
)
