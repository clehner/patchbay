var plugs = require('../plugs')
var sbot_blobs_resolve = plugs.first(exports.sbot_blobs_resolve = [])

var isLocal = true // TODO

exports.get_blob_url = function (id, cb) {
  if (isLocal)
    sbot_blobs_resolve(id, function (err, path) {
      if (err) cb(err)
      else cb(null, 'file:///'+encodeURI(path))
    })
  else
    cb(null, 'http://localhost:7777/'+encodeURIComponent(id))
}
