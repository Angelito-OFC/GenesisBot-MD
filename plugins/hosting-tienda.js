let handler = async(m, { conn, usedPrefix, command }) => {
let name = await conn.getName(m.sender)
let imagenes = ["https://pomf2.lain.la/f/dye13c4r.jpg",
"https://pomf2.lain.la/f/fgyvoz38.jpg",
"https://pomf2.lain.la/f/jq33eb3h.jpg"]

let img = imagenes[Math.floor(Math.random() * imagenes.length)]

    let don = `*Bienvenid@ ${name} a nuestra tienda virtual, donde podrás encontrar los precios y servicios ofrecidos por TK-Hosting.*

🛒 *\`$2.43\`* TK-Coins 500+10%
🛒 *\`$4.55\`* TK-Coins 1000+10%
🛒 *\`$6.66\`* TK-Coins 1500+10%
🛒 *\`$8.77\`* TK-Coins 2000+10%
🛒 *\`$10.89\`* TK-Coins 2500+10%
🛒 *\`$21.46\`* TK-Coins 5000+15%
🛒 *\`$42.60\`* TK-Coins 10600+20%

`
await m.react('⛱️') 

 conn.sendMessage(m.chat, {
        text: don,
        contextInfo: {
        externalAdReply: {
        title: 'ＴＫ － ＴＩＥＮＤＡ ＶＩＲＴＵＡＬ 🛒',
        body: '¡El servicio ideal para llevar tus proyectos al siguiente nivel!',
        thumbnailUrl: img,
        sourceUrl: 'https://dash.tk-joanhost.com',
        mediaType: 1,
        renderLargerThumbnail: true
        }}},
        { quoted: m})

/* await conn.sendMessage(m.chat, { text: don,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `ＴＫ － ＴＩＥＮＤＡ ＶＩＲＴＵＡＬ 🛒`,
body: `¡El servicio ideal para llevar tus proyectos al siguiente nivel!`,
"previewType": "PHOTO",
thumbnailUrl: img, 
sourceUrl: 'https://dash.tk-joanhost.com'}}},
{ quoted: m}) */

// conn.sendFile(m.chat, img, 'img.jpg', don, fkontak, null, rcanal)
}

handler.help = ['tiendatk']
handler.tags = ['tk']
handler.command = ['tiendatk'] 

export default handler