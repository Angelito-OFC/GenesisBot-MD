import Starlights from '@StarlightsTeam/Scraper';
import fetch from 'node-fetch';
import Sph from 'ytdl-mp3';

const limit = 100;

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
    // Verificar si el mensaje citado existe y contiene el resultado de "YouTube Play"
    if (!m.quoted) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(() => m.react('✖️'));
    if (!m.quoted.text.includes("*`【Y O U T U B E - P L A Y】`*")) {
        return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m).then(() => m.react('✖️'));
    }

    // Extraer URLs del mensaje citado
    let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/, 'gi'));
    if (!urls) return conn.reply(m.chat, `Resultado no encontrado.`, m).then(() => m.react('✖️'));
    if (urls.length < text) return conn.reply(m.chat, `Resultado no encontrado.`, m).then(() => m.react('✖️'));

    let user = global.db.data.users[m.sender];
    let videoUrl = urls[0]; // Tomar el primer URL encontrado

    await m.react('🕓');

    try {
        // Primera opción: Usar ytmp3v2 de Starlights
        let { title, duration, size, thumbnail, dl_url } = await Starlights.ytmp3v2(videoUrl);

        if (parseFloat(size.split('MB')[0]) >= limit) {
            return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(() => m.react('✖️'));
        }

        let img = await (await fetch(thumbnail)).buffer();
        let txt = `\`乂  Y O U T U B E  -  M P 3\`\n\n` +
                  `✩   *Título* : ${title}\n` +
                  `✩   *Duración* : ${duration}\n` +
                  `✩   *Tamaño* : ${size}\n\n` +
                  `>- ↻ El audio se está enviando, espera un momento...`;

        await conn.sendMessage(m.chat, { image: img, caption: txt }, { quoted: m });
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
        await m.react('✅');
    } catch (error1) {
        try {
            // Segunda opción: Usar ytmp3 de Starlights
            let { title, size, quality, thumbnail, dl_url } = await Starlights.ytmp3(videoUrl);

            if (parseFloat(size.split('MB')[0]) >= limit) {
                return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(() => m.react('✖️'));
            }

            let img = await (await fetch(thumbnail)).buffer();
            let txt = `\`乂  Y O U T U B E  -  M P 3\`\n\n` +
                      `✩   *Título* : ${title}\n` +
                      `✩   *Calidad* : ${quality}\n` +
                      `✩   *Tamaño* : ${size}\n\n` +
                      `>- ↻ El audio se está enviando, espera un momento...`;

            await conn.sendMessage(m.chat, { image: img, caption: txt }, { quoted: m });
            await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
            await m.react('✅');
        } catch (error2) {
            try {
                // Tercera opción: Usar ytdl-mp3
                let cxf = await Sph.ytdl(videoUrl);
                let txt = `\`乂  Y O U T U B E  -  M P 3\`\n\n` +
                          `✩   *Título* : ${cxf.title}\n` +
                          `✩   *Calidad* : ${cxf.quality}\n` +
                          `✩   *Url* : ${cxf.url}\n\n` +
                          `>- ↻ El audio se está enviando, espera un momento...`;

                await conn.sendMessage(m.chat, { image: { url: cxf.thumbnail }, caption: txt }, { quoted: m });
                await conn.sendMessage(m.chat, { audio: { url: cxf.dl_url }, fileName: `${cxf.title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
                await m.react('✅');
            } catch (error3) {
                // Manejo de error final
                await m.react('✖️');
                return m.reply(`Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.`);
            }
        }
    }
};

handler.help = ['ytmp3 <link>'];
handler.tags = ['downloader'];
handler.customPrefix = /^(audio|yta|fgmp3)$/i; // Prefijo personalizado para comandos
handler.command = ['audio', 'yta', 'fgmp3'];
handler.register = true;

export default handler;
