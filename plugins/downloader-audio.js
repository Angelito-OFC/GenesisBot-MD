import fetch from "node-fetch"
 
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply("ingresa un link de youtube")
 
try {
let api = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${args[0]}`)
let json = await api.json()
let { title, downloadUrl:dl_url, thumbnail } = json.data
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
 
} catch (error) {
console.error(error)
}}
 
handler.command = ['ytmp3']
 
export default handler