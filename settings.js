import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['59168683798', 'AngelitoDev', true],
  ['59168683798', 'AngelDev', true],
  [''],
  [''],
  [''],
  [''],
  [''],
  [''],
  ['']

]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []
   
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = ' ❜︧༷︧➭ િ𝐆єห͓૯ઽíន λł ી▵°⬸'
global.author = '@usxr_angelito0'
global.namebot = 'Genesis Ai'
global.wait = '*Aɢᴜᴀʀᴅᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ ฅ^•ﻌ•^ฅ*'
global.wm = '▸ ⃦Ⴚɛɳєડｪꪳ͢ئ ﾑ፤ ꩍꩍꢀ 𓏲᭔۫֟፝֯᷼๑꙰୭᳟⁣᭄'
global.stickpack = `©️ ρσωε૨ ɓყ ƭεαɱ รƭα૨૮σ૨ε`
global.titulowm = '-❀ᩙ̈͟༚̮ ⡞᪲=͟͟͞🄶𝚎᪶۫۫𝚗᪶۫۫𝚎᪶۫۫𝚜᪶۫۫𝚒᪶۫۫𝚜᪶۫ 𝚊᪶۫𝚒᪶۫͜ ≼᳞ׄ ᵎ ˚꙳꤬ꨪ'
global.titulowm2 = '.‧·ீ੭ ¡ ᗃᮢ፝֟͡Gᴇɴᴇsɪs B۵ᴛ ʟᴀ ᴍᴇᴊ꧔ʀ !˚̩̩̥͙°̩̥༅˚'
global.igfg = '@usxr_angelito0'
global.botname = '  ᩠ ꣣ʹ͚〃Ǥ℮ภэડเธ λ𝕚  ·ꗏฺ̇·.•۟'
global.dev = '_© Reserved | Genesis AI *2024*_\n'
global.titu = '©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ'
global.textbot = 'ɢᴇɴᴇꜱɪꜱʙᴏᴛ x ᴀɴɢᴇʟ-ᴏꜰᴄ 🤍'
global.listo = '*Aqui tiene ฅ^•ﻌ•^ฅ*'
global.vs = '2.0.0'
global.namechannel = '𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍'
global.stickauth = `© Genesis Ai By Angelito-OFC`
global.dis = ':⁖֟⊱┈֟፝❥'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
global.group = 'https://chat.whatsapp.com/GqKwwoV2JJaJDP2SL7SddX'
global.group2 = 'https://chat.whatsapp.com/Fn5Ipyxu6mE6qEQlwWZTwU'
global.canal = 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
global.github = 'https://github.com/Angelito-OFC/GenesisBot-MD' 
global.instagram = 'https://www.instagram.com/usxr_angelito0' 
global.whatsApp = 'https://wa.me/59168683798'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '𝗚𝗲𝗻𝗲𝘀𝗶𝘀𝗕𝗼𝘁-𝗠𝗗', orderTitle: 'packname', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.fakegif2 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'GenesisBot-MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𖥔.𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨❞ ꔷ──᜔◇⃟̣̣⃕✨', jpegThumbnail: catalogo }}};

global.fakegif3 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'GenesisBot-MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖ɢ ᴇ ɴ ᴇ ꜱ ɪ ꜱ ♡', jpegThumbnail: catalogo }}};

global.fakegif4 = { key: { participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { videoMessage: { title: 'GenesisBot-MD', h: `Hmm`, seconds: '99999', gifPlayback: true, caption: '⚘݄𖠵⃕⁖𝐒𝐭𝐢𝐜𝐤𝐞𝐫 (^_^♪) 💥', jpegThumbnail: catalogo }}};

global.estilox = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'GenesisBot-MD', orderTitle: 'packname', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})