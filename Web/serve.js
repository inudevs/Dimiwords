const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

var options = {
  key: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/certificate.crt')),
  ca: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/ca_bundle.crt'))
}

var port = 443
https.createServer(options, app).listen(port, function () {
  console.log('Frontend server listening on port ' + port)
})

http.createServer(function (req, res) {
  res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url })
  res.end()
}).listen(80)
