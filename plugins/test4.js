/* import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://open.spotify.com/track/7p30D2KjK2XW7YUvI6nH3o\n\n*Tips :* Untuk mencari link spotify, bisa juga dengan command *${usedPrefix}spotsearch*`
    if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	let res = await fetch(`https://api.ikyy.my.id/spotifydl?url=${text}`)
    if (!res.ok) throw `Maaf Sepertinya Terjadi Kesalahan`
    command = command.toLowerCase()
    let json = await res.json()
    if (json.status != '200') throw `Terjadi kesalahan, Coba Lagi Nanti.`
	let get_result = json.result
	let ini_txt = `Found : ${text}\n\n`
	ini_txt += `Title : *${get_result.title}*\n`
	ini_txt += `Artists : ${get_result.artists}\n`
	ini_txt += `Duration : ${get_result.duration}\n`
	ini_txt += `Popularity : ${get_result.popularity}\n`
	ini_txt += `${get_result.preview_url ? `Preview : ${get_result.preview_url}\n` : ''}`
	await conn.sendFile(m.chat, get_result.thumbnail, 'spot.jpg', ini_txt, m)
	if (command.includes('mp3')) {
		await conn.sendMessage(m.chat, {document: { url: get_result.link }, mimetype: 'audio/mpeg', fileName: `${get_result.artists} - ${get_result.title}.mp3`}, { quoted : m })
	} else {
		await conn.sendMessage(m.chat, { audio: { url: get_result.link }, mimetype: 'audio/mp4' }, { quoted : m })
	}
}

handler.help = ['spotifydl']
handler.tags = ['downloader', 'premium']
handler.command = /^(spotifydl)$/i

handler.premium = true

export default handler */