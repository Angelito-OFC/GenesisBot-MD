/* 
- YTMP4 By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import { ytmp4 } from 'ruhend-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m, fake)
            .then(_ => m.react('✖️'));
    }

    if (!m.quoted.text.includes("*\`【Y O U T U B E - P L A Y】\`*")) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m, fake)
            .then(_ => m.react('✖️'));
    }

    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'));

    if (!urls) {
        return conn.reply(m.chat, `*\`Resultado no Encontrado.🤍\`*`, m, fake).then(_ => m.react('✖️'));
    }

    if (urls.length < parseInt(text)) {
        return conn.reply(m.chat, `*\`Resultado no Encontrado.🤍\`*`, m, fake).then(_ => m.react('✖️'));
    }

    let user = global.db.data.users[m.sender];

    await m.react('🕓');
    try {
        let videoUrl = urls[0];
        let { title, video, author, description, duration, views, upload, thumbnail } = await ytmp4(videoUrl);

        // Formatear el mensaje con los detalles del video
        let caption = `🎬 *Título:* ${title}\n`;
        caption += `👤 *Autor:* ${author}\n`;
        caption += `📝 *Descripción:* ${description}\n`;
        caption += `⏳ *Duración:* ${duration}\n`;
        caption += `👁️ *Vistas:* ${views}\n`;
        caption += `📅 *Subido:* ${upload}`;

        // Enviar el video al usuario
        await conn.sendMessage(m.chat, { 
            video: { url: video }, 
            caption: caption, 
            mimetype: 'video/mp4' 
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `*\`Hubo un error al procesar la descarga.🤍\`*`, m, fake).then(_ => m.react('✖️'));
    }
};

handler.help = ['video'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Video|video)/;
handler.command = new RegExp;

export default handler;
