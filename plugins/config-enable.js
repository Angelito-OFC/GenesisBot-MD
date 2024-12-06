
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

const miniopcion = `🤍 *OPCIONES PARA GRUPOS*

welcome
antiTiktok
antiYoutube
antiTelegram
antiFacebook
antiInstagram
antiTwitter
antiDiscord
antiver
modoadmin
antispam
antitoxic
nsfw
antiarabes
antilink
autoread
document

*ejemplo*

.on welcome
.off welcome`

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
  case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.bienvenida = isEnable
      break
     
     case 'autoread':
    case 'autoleer':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break

    case 'document':
    case 'documento':
    isUser = true
    user.useDocument = isEnable
    break
 
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      

case 'antitiktok': case 'antitk': case 'antitik':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTiktok = isEnable 
break

case 'antiyoutube': case 'antiyt':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiYoutube = isEnable 
break

case 'antitelegram': case 'antitl': case 'antitele': case 'antitg': case 'antitel':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTelegram = isEnable 
break

case 'antifacebook': case 'antifb': case 'antifbook':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiFacebook = isEnable 
break

case 'antiinstagram': case 'antinstagram': case 'antiig': case 'antig': case 'antiinsta': case 'antinsta':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiInstagram = isEnable 
break

case 'antitwitter': case 'antitw': case 'antitwit': case 'antitwter': case 'antitwiter': case 'antix':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitter = isEnable 
break

case 'antidiscord':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiDiscord = isEnable 
break

case 'antithreads':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiThreads = isEnable 
break

case 'antitwitch':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitch = isEnable 
break

case 'antitoxic': case 'antitoxicos': case 'antimalos':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antitoxic = isEnable
break

case 'antispam':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam = isEnable
break

case 'modoadmin': case 'soloadmin': case 'modeadmin':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modoadmin = isEnable          
break    

      case 'nsfw':
      case 'modohorny':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
            throw false
           }}
    chat.nsfw = isEnable          
    break

case 'antiver': case 'modover': case 'modoobservar': case 'modobservar': case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiver = isEnable 
break

     case 'antiarabes':
     case 'antinegros':
       if (m.isGroup) {
         if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
           throw false
         }}
       chat.onlyLatinos = isEnable  
       break
    default:
if (!/[01]/.test(command)) return await conn.reply(m.chat, miniopcion, m, rcanal);
      throw false
  }
conn.sendMessage(m.chat, {text: `\`❱❱ 𝗚𝗘𝗡𝗘𝗦𝗜𝗦 • 𝗠𝗗 ❰❰\`\n\n*» 𝗢𝗣𝗖𝗜𝗢𝗡 |* _${type.toUpperCase()}_\n*» 𝗘𝗦𝗧𝗔𝗗𝗢 |* ${isEnable ? 'ON' : 'OFF'}\n*» 𝗣𝗔𝗥𝗔 |* ${isAll ? 'ESTE BOT' : isUser ? '' : 'ESTE CHAT'}\n> ${stickpack}`}, {quoted: estilo});
}

handler.help = ['enable', 'disable']
handler.tags = ['nable']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler
