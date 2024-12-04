import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'INFO',
  'search': 'SEARCH',
  'game': 'GAME',
  'serbot': 'SUB BOTS',
  'rpg': 'RPG',
  'rg': 'REGISTRO',
  'sticker': 'STICKER',
  'img': 'IMAGE',
  'group': 'GROUPS',
//  'logo': 'MAKER',
  'nable': 'ON / OFF', 
  'premium': 'PREMIUM',
  'downloader': 'DOWNLOAD',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'nsfw': 'NSFW', 
  'cmd': 'DATABASE',
  'owner': 'OWNER', 
  'audio': 'AUDIOS', 
  'advanced': 'ADVANCED',
}

const defaultMenu = {
  before: `*%greeting \`%name\`*

➫ _\`ᴀᴄᴛɪᴠᴏ\`_ :: _%muptime_
➫ _\`ᴜꜱᴜᴀʀɪᴏꜱ\`_ :: _%rtotalreg de %totalreg_
➫ _\`ᴄᴏʀᴀᴢᴏɴᴇꜱ\`_ :: _%corazones_
➫ _\`ᴘʀᴇꜰɪᴊᴏ\`_ :: _< . >_
➫ _\`ᴘᴀᴛʀᴏᴄɪɴᴀᴅᴏʀ\`_ :: _Tk-Host_

▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬
 %readmore
`.trimStart(),
  header: '╭─(❀)❝┊ *_`%category`_* ┊❝(❀',
    body: '┊➫ %cmd %islimit %isPremium\n',
   footer: '╰─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒\n',
    after: `> ©️ ρσωε૨ ɓყ ƭεαɱ รƭα૨૮σ૨ε`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, corazones, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        corazones: plugin.corazones,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, level, corazones, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let img = 'https://pomf2.lain.la/f/znvuwfv4.jpg'
    await m.react('🤍')
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, fake)

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Buenas noches 🌙'; break;
  case 1: hour = 'Buenas noches 💤'; break;
  case 2: hour = 'Buenas noches 🦉'; break;
  case 3: hour = 'Buenos dias ✨'; break;
  case 4: hour = 'Buenos dias 💫'; break;
  case 5: hour = 'Buenos dias 🌅'; break;
  case 6: hour = 'Buenos dias 🌄'; break;
  case 7: hour = 'Buenos dias 🌅'; break;
  case 8: hour = 'Buenos dias 💫'; break;
  case 9: hour = 'Buenos dias ✨'; break;
  case 10: hour = 'Buenos dias 🌞'; break;
  case 11: hour = 'Buenos dias 🌨'; break;
  case 12: hour = 'Buenos dias ❄'; break;
  case 13: hour = 'Buenos dias 🌤'; break;
  case 14: hour = 'Buenas tardes 🌇'; break;
  case 15: hour = 'Buenas tardes 🥀'; break;
  case 16: hour = 'Buenas tardes 🌹'; break;
  case 17: hour = 'Buenas tardes 🌆'; break;
  case 18: hour = 'Buenas noches 🌙'; break;
  case 19: hour = 'Buenas noches 🌃'; break;
  case 20: hour = 'Buenas noches 🌌'; break;
  case 21: hour = 'Buenas noches 🌃'; break;
  case 22: hour = 'Buenas noches 🌙'; break;
  case 23: hour = 'Buenas noches 🌃'; break;
}
  var greeting = "espero que tengas " + hour;
