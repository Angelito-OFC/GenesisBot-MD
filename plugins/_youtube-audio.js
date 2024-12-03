import { ytbmp3downloader } from 'neastooapi';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    if (!m.quoted) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m)
            .then(() => m.react('✖️'));
    }

    if (!m.quoted.text.includes("*\`【Y O U T U B E - P L A Y】\`*")) {
        return conn.reply(m.chat, `*\`Etiqueta el mensaje que contenga el resultado del Play.🤍\`*`, m)
            .then(() => m.react('✖️'));
    }

    let urls = m.quoted.text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/gi);

    if (!urls) {
        return conn.reply(m.chat, `*\`Resultado no Encontrado.🤍\`*`, m).then(() => m.react('✖️'));
    }

    let videoUrl = urls[0];

    await m.react('🕓');
    try {
        // Obtener datos del video con ytbmp3downloader
        let vid = await ytbmp3downloader(videoUrl);

        if (!vid || !vid.status) {
            throw new Error('Error al obtener los datos del video');
        }

        // Extraer información del resultado
        let { title, author, thumbnail, audio } = vid.result;
        let audioUrl = audio; // En el caso de que audio ya sea directamente la URL

        // Enviar mensaje con el audio
        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: "audio/mp4",
            fileName: title + '.mp3',
            quoted: m,
            contextInfo: {
                forwardingScore: 200,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: false,
                    title: title,
                    body: author,
                    mediaType: 2,
                    sourceUrl: videoUrl,
                    thumbnail: await (await fetch(thumbnail)).buffer()
                }
            }
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `*\`Hubo un error al procesar la descarga.🤍\`*`, m).then(() => m.react('✖️'));
    }
};

handler.help = ['Audio'];
handler.tags = ['downloader'];
handler.customPrefix = /^(Audio|audio)/;
handler.command = new RegExp;

export default handler;
