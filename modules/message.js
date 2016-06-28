var h = require('hyperscript')
var u = require('../util')
var pull = require('pull-stream')



var plugs = require('../plugs')
var message_content = plugs.first(exports.message_content = [])
var avatar = plugs.first(exports.avatar = [])
var message_meta = plugs.map(exports.message_meta = [])
var message_action = plugs.map(exports.message_action = [])
var message_link = plugs.first(exports.message_link = [])

var sbot_links = plugs.first(exports.sbot_links = [])

exports.message_render = function (msg, sbot) {
  var el = message_content(msg)
  if(!el) return

  var backlinks = h('div.backlinks')

  pull(
    sbot_links({dest: msg.key, rel: 'mentions', keys: true}),
    pull.collect(function (err, links) {
      if(links.length)
        backlinks.appendChild(h('label', 'backlinks:', 
          h('div', links.map(function (link) {
            return message_link(link.key)
          }))
        ))
    })
  )

  var msg = h('div.message.column',
    h('div.title.row',
      h('div.avatar', avatar(msg.value.author)),
      h('div.message_meta.row', message_meta(msg))
    ),
    h('div.message_content', el),
    h('div.message_actions.row',
      h('div.actions', message_action(msg))
    ),
    backlinks,
    {onkeydown: function (ev) {
      //on enter, hit first meta.
      if(ev.keyCode == 13) {
        msg.querySelector('.enter').click()
      }
      //on plus, hit first vote.
      else if(ev.keyCode == 187) {
        msg.querySelector('.plus').click()
      }
    }}
  )

  // ); hyperscript does not seem to set attributes correctly.
  msg.setAttribute('tabindex', '0')

  return msg
}





