import axios from 'axios'
import { Sticker } from 'wa-sticker-formatter'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        let txt = text ? text: typeof q.text == 'string' ? q.text: ''
        if (!txt) throw `Example: ${usedPrefix + command} halo`
        let avatar = await conn.profilePictureUrl(q.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
        avatar = /tele/.test(avatar) ? avatar: await uploadImage((await conn.getFile(avatar)).data)
        if (!/image\/(jpe?g|png)/.test(mime)) {
            let req = await fakechat(txt, q.name, avatar)
            let stiker = await createSticker(req, false, stickpack, stickauth)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            let img = await q.download()
            let url = await uploadImage(img)
            let req = await fakechatImg(url, txt, q.name, avatar)
            let stiker = await createSticker(req, false, stickpack, stickauth)
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
    } catch (e) {
        throw e
    }
}
handler.help = ['fakechat']
handler.tags = ['sticker']
handler.command = /^(fc|fakechat)$/i
handler.limit = true
handler.onlyprem = true
export default handler

async function fakechat(text, name, url) {
    let body = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
        "avatar": true,
        "from": {
            "first_name": name,
            "language_code": "en",
            "name": name,
            "photo": {
            "url": url
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://bot.lyo.su/quote/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function fakechatImg(url, text, name, avatar) {
    let body = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
        "entities": [],
        "media": {
            "url": url
        },
        "avatar": true,
        "from": {
            "id": 1,
            "name": name,
            "photo": {
            "url": avatar
            }
        },
        "text": text,
        "replyMessage": {}
        }]
    }
    let res = await axios.post('https://bot.lyo.su/quote/generate', body);
    return Buffer.from(res.data.result.image, "base64");
}

async function createSticker(req, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: stickpack,
        author: stickauth,
        quality
    }
return (new Sticker(req ? req: url, stickerMetadata)).toBuffer()
}