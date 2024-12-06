import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import FormData from "form-data"
import Jimp from "jimp"
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { command, conn, usedPrefix }) => {
  await m.react('🕒');

  try {
    // Fetch the JSON data from the URL
    const res = (await axios.get(`https://raw.githubusercontent.com/WOTCHITA/YaemoriBot-MD/master/src/JSON/anime-${command}.json`)).data;

    // Ensure the array contains items
    if (!Array.isArray(res) || res.length === 0) {
      throw new Error('No se encontraron imágenes');
    }

    // Function to shuffle an array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    // Shuffle the images array
    shuffleArray(res);

    // Select the first 10 random images
    const images = res.slice(0, 10);

    // Prepare the results for the carousel
    const results = await Promise.all(images.map(async (imageUrl, index) => {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Error al descargar la imagen');
      }
      const imageBuffer = await imageResponse.buffer();
      let pr = await remini(imageBuffer, "enhance")
      const mediaMessage = await prepareWAMessageMedia({ image: pr }, { upload: conn.waUploadToServer });
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ GenesisBot By Angel-OFC ]*' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `*\`Imagen De :\`* ${command}`,
          hasMediaAttachment: true,
          imageMessage: mediaMessage.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      };
    }));

    // Send the carousel message
    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🤍 \`${command}\` 🤍`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "_\`ᴀ\` \`ɴ\` \`ɪ\` \`ᴍ\` \`ᴇ\` - \`2\` \`0\` \`2\` \`4\`_"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: results
            }),
            contextInfo: {
									mentionedJid: [m.sender],
									forwardingScore: 999,
									isForwarded: true,
									forwardedNewsletterMessageInfo: {
										newsletterJid: "120363220939514640@newsletter",
										newsletterName: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍",
										serverMessageId: 143
									}
								}
          })
        }
      }
    }, {
      quoted: fakegif3
    });

    await m.react('✅');
    await conn.relayMessage(m.chat, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌️ *OCURRIÓ UN ERROR:* ${error.message}`, m);
  }
};

handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'];
handler.tags = ['anime'];

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (availableOperations.includes(operation)) {
      operation = operation
    } else {
      operation = availableOperations[0]
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    )
  })
}
//xd