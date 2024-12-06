import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let img = await (await fetch(`https://telegra.ph/file/b97148e2154508f63d909.jpg`)).buffer()
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = ` –  *L E V E L U P  -  U S E R*\n\n`
            txt += `✩ *Nombre* : ${name}\n`
            txt += `✩ *Nivel* : ${user.level}\n`
            txt += `✩ *XP* : ${user.exp - min}/${xp}\n\n`
            txt += `Te falta *${max - user.exp}* de *💫 XP* para subir de nivel`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fake)
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
       let txt = ` –  *L E V E L U P  -  U S E R*\n\n`
           txt += `✩ *Nombre* : ${conn.getName(m.sender)}\n`
           txt += `✩ *Nivel Anterior* : ${before}\n`
           txt += `✩ *Nivel Actual* : ${user.level}\n\n`
           txt += `🤍 Cuanto más interactúes con *Ai Hoshino*, mayor será tu Nivel`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, fake)
        }
    }
handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler