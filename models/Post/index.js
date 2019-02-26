const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
  title: String,
  description: String,
  images: [String],
  thumbnailImage: String,
  createdBy: ObjectId,
  created: Date,
  updated: Date,
  embedContent: String,
  featured: Boolean,
  type: ObjectId
})

module.exports = mongoose.model('Post', PostSchema)
