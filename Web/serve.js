const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const urljoin = require('url-join')

const app = express()

// serve dist
app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

var options = { // ssl
  key: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/certificate.crt')),
  ca: fs.readFileSync(path.resolve(__dirname, '../Server/config/ssl/ca_bundle.crt'))
}

var port = 443
// https server
https.createServer(options, app).listen(port, function () {
  console.log('Frontend server listening on port ' + port)
})

// redirect http to https
http.createServer(function (req, res) {
  res.writeHead(301, { 'Location': urljoin('https://', req.headers['host'], req.url) })
  res.end()
}).listen(80)
