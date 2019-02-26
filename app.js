const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/json requests
app.use(bodyParser.json())

module.exports = app
