import Starlights from '@StarlightsTeam/Scraper'
let limit = 300
let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!m.quoted) return // conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
if (!m.quoted.text.includes("*\`【Y O U T U B E - P L A Y】\`*")) return // conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
let user = global.db.data.users[m.sender]

await m.react('🕓')
try {
let v = urls[0]
let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp4v2(v)

if (size.split('MB')[0] >= limit) return conn.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))

await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}`, m, false, { asDocument: user.useDocument })
await m.react('✅')
} catch {
try {
let v = urls[0]
let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp4(v)

if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))

        let caption = `» *Título:* ${title}\n`;
        caption += `» *Calidad:* ${quality}\n`;
        caption += `» *Tamaño:* ${size}\n`;

        // Enviar el video al usuario
        await conn.sendMessage(m.chat, { 
            video: { url: dl_url }, 
            caption: caption, 
            mimetype: 'video/mp4' 
        }, { quoted: m });


/* await conn.sendFile(m.chat, dl_url, title + '.mp4', `*» Título* : ${title}\n*» Calidad* : ${quality}`, m, false, { asDocument: user.useDocument }) */
await m.react('✅')
} catch {
await m.react('✖️')
}}}
handler.customPrefix = /^(V|v)/
handler.command = new RegExp

export default handler
