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
conn.sendFile(m.chat, img, 'img.jpg', don, fkontak, null, rcanal)
}

handler.help = ['redes']
handler.tags = ['info']
handler.command = ['redes'] 

export default handler