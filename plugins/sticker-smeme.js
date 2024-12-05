import { uploadPomf } from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw m.reply(`✧ Responde a una *Imagen* con el comando\n\n${usedPrefix + command} <${atas ? atas : 'Texto Arriba'}>|<${bawah ? bawah : 'Texto Bajo'}>`)
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadPomf(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    let stiker = await sticker(false, meme, global.stickpack, global.wm)
    if (stiker) await conn.sendFile(m.chat, stiker, '', m, '', { asSticker: 1 })
}
handler.help = ['smeme <txt>|<txt>']
handler.tags = ['tools']
handler.command = /^(smeme)$/i

handler.register = true

export default handler