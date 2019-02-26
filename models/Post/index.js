const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const PostSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  images: { type: [String], default: [] },
  thumbnailImage: { type: String, default: '' },
  createdBy: ObjectId,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  embedContent: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  type: ObjectId
})

module.exports = mongoose.model('Post', PostSchema)
