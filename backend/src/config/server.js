const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

/*
    middlewares
*/

// parse de formulário
server.use(bodyParser.urlencoded({ extended: true }))

// parse de json
server.use(bodyParser.json())

// habilita o middleware cors.js
server.use(allowCors)

// ativa o servidor na porta especificada
server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server