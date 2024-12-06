/* ʙʏ ᴊᴛxꜱ 🐢 */
import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en Spotify 🤍');

try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({image: { url }}, {upload: conn.waUploadToServer})
return imageMessage
}

let push = [];
let api = await fetch(`https://deliriussapi-oficial.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
let json = await api.json()

for (let track of json.data) {
let image = await createImage(track.image)

/* push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: '${track.title} - ${track.artist}'
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({text: `©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ`}),
header: proto.Message.InteractiveMessage.Header.fromObject({title: '*\`【 SPOTIFY - SEARCH 】\`*', hasMediaAttachment: true, imageMessage: image}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [ */ 

        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `\n> *🤍 \`TÍTULO:\`* ${track.title} \n> *🤍 \`ARTISTAS:\`* ${track.artist} \n> *🤍 \`ALBUM:\`* ${track.album} \n> *🤍 \`DURACIÓN:\`* ${track.duration} \n> *🤍 \`POPULARIDAD:\`* ${track.popularity} \n> *🤍 \`FECHA:\`* ${track.publish}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ' 
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '*\`【 SPOTIFY - SEARCH 】\`*',
                hasMediaAttachment: true,
                imageMessage: image 
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
{
"name": "cta_copy",
"buttonParamsJson": "{\"display_text\":\"🎧 ¡Descargar Audio! 🎧\",\"id\":\"123456789\",\"copy_code\":\".spotify " + track.url + "\"}"
},
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({text: '*`\Resultados de:\`* ' + `${text}`}),
footer: proto.Message.InteractiveMessage.Footer.create({text: '_\`ꜱ\` \`ᴘ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`ᴄ\` \`ʜ\`_'}),
header: proto.Message.InteractiveMessage.Header.create({hasMediaAttachment: false}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({cards: [...push]})
})
}}}, {
    'quoted': m
  });

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error)
}}

handler.help = ["spotifysearch"]
handler.tags = ["search"]
handler.command = /^(spotifysearch)$/i

export default handler