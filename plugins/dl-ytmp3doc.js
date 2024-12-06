import Starlights from '@StarlightsTeam/Scraper'
import fetch from 'node-fetch'
import Sph from 'ytdl-mp3'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply('[ ✰ ] Ingresa el enlace del vídeo de *YouTube* junto al comando.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* https://youtu.be/QSvaCSt8ixs`)
    }

    await m.react('🕓') 
    try {
        let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp3v2(args[0])

        let img = await (await fetch(thumbnail)).buffer()
        let txt = '`乂  Y O U T U B E  -  M P 3`\n\n' +
                  `	✩   *Título* : ${title}\n` +
                  `	✩   *Duración* : ${duration}\n` +
                  `	✩   *Tamaño* : ${size}\n\n` +
                  '> *- ↻ El audio se está enviando, espera un momento...*'

        await conn.sendMessage(m.chat, { image: img, caption: txt }, { quoted: m })
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
        await m.react('✅')
    } catch {
        try {
            let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(args[0])

            let img = await (await fetch(thumbnail)).buffer()
            let txt = '`乂  Y O U T U B E  -  M P 3`\n\n' +
                      `	✩   *Título* : ${title}\n` +
                      `	✩   *Calidad* : ${quality}\n` +
                      `	✩   *Tamaño* : ${size}\n\n` +
                      '> *- ↻ El audio se está enviando, espera un momento...*'

            await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
            await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })
            await m.react('✅')
        } catch {
            try {
                let cxf = await Sph.ytdl(args[0])
                let txt = '`乂  Y O U T U B E  -  M P 3`\n\n' +
                          `	✩   *Título* : ${cxf.title}\n` +
                          `	✩   *Calidad* : ${cxf.quality}\n` +
                          `	✩   *Url* : ${cxf.url}\n\n` +
                          '> *- ↻ El audio se está enviando, espera un momento...*'

                await conn.sendMessage(m.chat, { image: { url: cxf.thumbnail }, caption: txt }, { quoted: m })
                await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m })
                await m.react('✅')
            } catch {
                await m.react('✖️')
            }
        }
    }
}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['dl']
handler.command = ['ytmp3', 'yta', 'fgmp3']
handler.register = true

export default handler
