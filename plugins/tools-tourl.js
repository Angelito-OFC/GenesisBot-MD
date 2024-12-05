import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import { uploadPomf } from "../lib/uploadImage.js";
const { proto, generateWAMessageFromContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m) => {
  try {
    const q = m.quoted || m;
    const mime = q.mediaType || "";
    if (!/image|video|audio|sticker|document/.test(mime)) 
      throw m.reply("✧ No hay medios marcados!");

    await conn.sendMessage(m.chat, { react: { text: "🔗", key: m.key } });

    const media = await q.download(true);
    let media2 = await q.download();
    const fileSizeInBytes = fs.statSync(media).size;

    if (fileSizeInBytes === 0) {
      await m.reply("Archivo vacío");
      await fs.promises.unlink(media);
      return;
    }

    if (fileSizeInBytes > 1073741824) {
      await m.reply("El archivo superó 1 GB");
      await fs.promises.unlink(media);
      return;
    }

    let url = await uploadPomf(media2);
    const caption = `\`T O U R L - U P L O A D\`

✧Pomf2 Link:
${url}

${wm}`;
    m.reply(caption);
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    await conn.sendMessage(m.chat, { react: { text: "❎", key: m.key } });
  }
};

handler.help = ["tourl"];
handler.tags = ["tools"];
handler.command = /^(tourl)$/i;
export default handler;

// Se elimina la función `uploadUguu`
