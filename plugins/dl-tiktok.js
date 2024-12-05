import fetch from 'node-fetch'
import ffmpeg from "fluent-ffmpeg"

var handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🤍\`*', m, fake, );
        await m.react('🕓');

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData) {
            throw m.reply("Error api!");
        }

        const videoURL = tiktokData.data.play;
        const videoURLWatermark = tiktokData.data.wmplay;
        let txt = '';
        txt += `*\`[ TIKTOK DOWNLOAD ]\`*\n\n`;
        txt += `> 🤍 *\`» Título :\`* ${tiktokData.data.title}\n`;
        txt += `> 🤍 *\`» Autor :\`* ${tiktokData.data.author.nickname || "No info"}\n`;
        txt += `> 🤍 *\`» Visitas :\`* ${tiktokData.data.play_count}\n`;
        txt += `> 🤍 *\`» Likes :\`* ${tiktokData.data.digg_count}\n`; 
        txt += `> 🤍 *\`» Comentarios :\`* ${tiktokData.data.comment_count}\n`;
        txt += `> 🤍 *\`» Descargas :\`* ${tiktokData.data.download_count}\n\n`;
        txt += '> ©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ\n';

        if (videoURL || videoURLWatermark) {

            await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', txt, m, null, rcanal);

       await conn.sendMessage(m.chat, { audio: { url: videoURL }, mimetype: "audio/mp4", fileName: tiktokData.data.title + '.mp3' }, { quoted: m })
            await m.react('✅');
            setTimeout(async () => {
            }, 1500);
        } else {
            throw m.reply("No se pudo descargar.");
        }
    } catch (error1) {
        conn.reply(m.chat, `Error: ${error1}`, m);
    }
};

handler.help = ['tiktok *<link>*']
handler.corazones = 3
handler.tags = ['dl']
handler.command = /^(tiktok)$/i;

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}

async function convertVideoToMp3(videoUrl, outputFileName) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .toFormat("mp3")
            .on("end", () => resolve())
            .on("error", (err) => reject(err))
            .save(outputFileName);
    });
}
