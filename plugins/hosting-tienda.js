let handler = async(m, { conn, usedPrefix, command }) => {
let name = await conn.getName(m.sender)

    let don = `${name}
🐈‍⬛ 𝗥 𝗘 𝗗 𝗘 𝗦  𝗚 𝗘 𝗡 𝗘 𝗦 𝗜 𝗦 🐈‍⬛

» 𝗖𝗥𝗘𝗔𝗗𝗢𝗥 𝗗𝗘𝗟 𝗕𝗢𝗧
🐈‍⬛ wa.me/59897246324

» 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠
🐈‍⬛ https://www.instagram.com/usxr_angelito

» 𝗧𝗛𝗥𝗘𝗔𝗗𝗦
🐈‍⬛ https://www.threads.net/@usxr_angelito

» 𝗚𝗜𝗧 𝗛𝗨𝗕
🐈‍⬛ https://github.com/Karim-off

» 𝗔𝗧𝗢𝗠 𝗕𝗜𝗢
🐈‍⬛ https://atom.bio/genesisbotasistencia

» 𝗖𝗢𝗥𝗥𝗘𝗢
🐈‍⬛ agasistencia2@gmail.com

> ${mssg.ig}
`
let img = 'https://i.ibb.co/jHctydb/Genesis-Bot.jpg'
conn.sendFile(m.chat, img, 'img.jpg', don, fkontak, null, rcanal)
}

handler.help = ['redes']
handler.tags = ['info']
handler.command = ['redes'] 

export default handler