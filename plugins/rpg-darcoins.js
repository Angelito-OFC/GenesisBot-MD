import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '🤍 Menciona al usuario con *@user.*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🤍 Ingrese la cantidad de *🤍 corazones* que quiere transferir.'
    if (isNaN(txt)) throw 'Sólo números.'
    let poin = parseInt(txt)
    let corazones = poin
    let imt = Math.ceil(poin * impuesto)
    corazones += imt
    if (corazones < 1) throw '🤍 Mínimo es *1 🤍 corazones*.'
    let users = global.db.data.users
    if (corazones > users[m.sender].corazones) throw 'No tienes suficientes *🤍 corazones* para dar.'
    users[m.sender].corazones -= corazones
    users[who].corazones += poin
    
    await m.reply(`*${-poin}* 🤍 corazones 
Impuesto 2% : *${-imt}* 🤍 corazones
Total gastado: *${-corazones}* 🤍 corazones`)
    conn.fakeReply(m.chat, `*+${poin}* *🤍 corazones.*`, who, m.text)
}
handler.help = ['darstars *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darcoins', 'darstars']
handler.register = true 

export default handler