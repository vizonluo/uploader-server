var http = require('http')
var util = require('util')
var path = require('path')
var fs = require('fs')

var formidable = require('formidable')
var serveStatic = require('serve-static')
var serveIndex = require('serve-index')

module.exports = function(opts) {
    opts = opts || {}
    var dir = opts.dir || process.cwd()
    dir = path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir)

    var port = opts.port || 3000

    var static = serveStatic(dir)
    var index = serveIndex(dir)

    var server = http.createServer(function(req, res) {
        if (req.method === 'POST') {
            var form = new formidable.IncomingForm()

            form.parse(req, function(err, fields, files) {
                var fileInfo = files.file

                fs.rename(fileInfo.path, path.join(dir, fileInfo.name))

                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('upload success');
            })
            return
        }

        static(req, res, function(err) {
            if (err) return err
            index(req, res)
        })
    })

    server.listen(port, function(err) {
        if (err) return err
        console.log('server start at ' + port)
    })
}

