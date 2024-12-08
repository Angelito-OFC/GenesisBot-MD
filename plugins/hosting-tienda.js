let handler = async(m, { conn, usedPrefix, command }) => {
let name = await conn.getName(m.sender)

    let don = `*Bienvenid@ ${name} a nuestra tienda virtual, donde podrás encontrar los precios y servicios ofrecidos por TK-Hosting.*

🛒 *\`$2.43\`* TK-Coins 500+10%
🛒 *\`$4.55\`* TK-Coins 1000+10%
🛒 *\`$6.66\`* TK-Coins 1500+10%
🛒 *\`$8.77\`* TK-Coins 2000+10%
🛒 *\`$10.89\`* TK-Coins 2500+10%
🛒 *\`$21.46\`* TK-Coins 5000+15%
🛒 *\`$42.60\`* TK-Coins 10600+20%

`
let img = 'https://i.ibb.co/jHctydb/Genesis-Bot.jpg'

await conn.sendMessage(m.chat, { text: data,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `[ 𝗖𝗛𝗔𝗧𝗚𝗣𝗧 - 𝗗𝗘𝗠𝗢 ]`,
body: `¡El servicio ideal para llevar tus proyectos al siguiente nivel!`,
"previewType": "PHOTO",
thumbnailUrl: 'https://tinyurl.com/2awg2bch', 
sourceUrl: 'https://dash.tk-joanhost.com'}}},
{ quoted: m})

conn.sendFile(m.chat, img, 'img.jpg', don, fkontak, null, rcanal)
}

handler.help = ['redes']
handler.tags = ['info']
handler.command = ['redes'] 

export default handler