const xppercorazones = 450
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buycoins/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xppercorazones * count
    global.db.data.users[m.sender].corazones += count
    conn.reply(m.chat, `╭────═[ *R P G  -  S H O P* ]═─────⋆
│╭───────────────···
││✯ *Compra* : + ${count} 🤍 Corazones 
││✯ *Costo* : -${xppercorazones * count} 💫 XP
│╰────────────────···
╰───────────═┅═──────────`, m, rcanal)
  } else conn.reply(m.chat, `🚩 Lo siento, no tienes suficientes *⭐ XP* para comprar *${count} 🤍 Corazones.*`, m, rcanal)
}
handler.help = ['buycoins', 'buyall']
handler.tags = ['rpg']
handler.command = ['buycoins', 'buyall'] 
handler.register = true 

export default handler