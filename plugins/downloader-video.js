import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 320
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
        if (!args || !args[0]) throw `✳️ ${mssg.example} :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
    if (!args[0].match(/youtu/gi)) throw `❎ ${mssg.noLink('YouTube')}`
         let chat = global.db.data.chats[m.chat]
         m.react(rwait) 

         let q = args[1] || '360p'
 try {
                const yt = await fg.ytv(args[0], q)
                let { title, dl_url, quality, size, sizeB } = yt
        let isLimit = limit * 1024 < sizeB 

     m.reply(` ${isLimit ? `≡  *Sylph - YTDL*\n\n❖ *⚖️ Peso*: ${size}\n❖ *🎞️ Calidad*: ${quality}\n\n❖ _Limite_ *+${limit} MB*` : global.wait }  `)

          if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp4', `
 ≡  *Sylph - YTDL*
  
*📌Titulo:* ${title}
*🎞️ Calidad:* ${quality}
*⚖️ peso :* ${size}
`.trim(), m, false, { asDocument: false })
                m.react(✅) 
         } catch {

        try {
        let yt = await fg.ytmp4(args[0], q)
    let { title, size, sizeB, dl_url, quality } = yt

  let isLimit = limit * 1024 < sizeB 
  m.reply(` ${isLimit ? `≡  *Sylph - YTDL*\n\n❖ *⚖️peso*: ${size}\n❖ *🎞️ Calidad*: ${quality}\n\n❖ _limite_ *+${limit} MB*` : global.wait }  `)
          if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp3', `
 ≡  *Sylph - YTDL*
  
❖ *📌 título* : ${title}
*🎞️ Calidad:* ${quality}
❖ *Peso* : ${size}
`.trim(), m, false, { asDocument: false })
                m.react(✅)

        } catch {
                await m.reply(`❎ error`)
        }
                } 
}
handler.command = ['ytmp4', 'ytv', 'ytvideo']
handler.diamond = 5
export default handler