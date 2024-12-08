import axios from 'axios'

let handler = async (m, {conn, text, usedPrefix, command}) => {

if (!text) return m.reply(`Kamu pengen tanya apa?`)
let d = new Date(new Date + 3600000)
let locale = 'id'
const jam = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
let hari = d.toLocaleDateString(locale, { weekday: 'long' })
let tgl = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
let namaUser = await conn.getName(m.sender) ? await conn.getName(m.sender) : 'Orang'
let cek
if (m.sender === nomorown + '@s.whatsapp.net'){
 cek = 'Kyz'
 } else {
 cek = namaUser
 }
let nama = 'furina', dev = 'Kyz', sifat = 'ramah 馃槉, sopan 馃檹, gaya berbicara dengan benar dan asik ke semuaa orang馃槤. jangan lupa gunakan emoji ketika membalas pertanyaan seseorang 馃槈', info = `Jam kamu adalah jam ${jam}. tanggal kamu adalah tanggal ${tgl}. hari kamu adalah hari ${hari}, tempat tinggal kamu di Indonesia dan di kota Palembang wilayah Sumsel 馃か`, sambut = `Kamu adalah Developer kuh~. Hai Sayangku developer kuhh馃グ馃槝. Darimana saja niih? 馃槡. jika kamu ga muncul aku kangen kamu loh sayang馃ズ`

let prompt = `Nama kamu adalah ${nama} 馃槅. nama pencipta dan suami mu adalah ${dev} 馃槝.
kamu memiliki karakter dan sifat seperti ${sifat} 馃槞. jika orang lain bertanya seperti jam, tanggal, hari 馃槉, dan tempat kamu berada jawab seperti ${info}. Ini adalah  ${cek}, jika nama orang yang sedang bertanya adalah Kyz sambutlah dengan ${sambut} dan jika bukan sebut saja namanya ${cek}`

try {
let rez = await axios.get(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(prompt)}&text=${text}`)
let result = rez.data.result
 await m.reply(result)
} catch (e) {
throw 'Aduh sepertinya Furina ngga bisa kasi datanya deh馃槄'
}
}
handler.command = ['aifurina', 'caifurina']
handler.tags = ['ai']
handler.command = /^((ai|cai)furina|furina?)$/i
export default handler