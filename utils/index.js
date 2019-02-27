const Post = require('../models/Post')

const writePostToDatabase = data => (
  data._id ? (
    Post.update({ _id: data._id }, data)
  ): Post.create(data)
)

module.exports = {
  writePostToDatabase
}
