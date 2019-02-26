const mongoose = require('mongoose')

const { Schema } = mongoose

const PostTypeSchema = new Schema({
    name: String
})

module.exports = mongoose.model('PostType', PostTypeSchema)
