
var getAvatar = require('ssb-avatar')
var h = require('hyperscript')
var ref = require('ssb-ref')

var plugs = require('../plugs')
var sbot_whoami = plugs.first(exports.sbot_whoami = [])
var sbot_links = plugs.first(exports.sbot_links = [])
var get_blob_url = plugs.first(exports.get_blob_url = [])

exports.avatar_image = function (author) {
  var img = h('img', {src: 'http://localhost:7777/img/fallback.png'})
  sbot_whoami(function (err, me) {
    if (err) return console.error(err)
    getAvatar({links: sbot_links}, me.id, author, function (err, avatar) {
      if (err) return console.error(err)
      if(ref.isBlob(avatar.image))
        get_blob_url(avatar.image, function (err, url) {
          if (err) return console.error(err)
          img.src = url
        })
    })
  })
  return img
}


