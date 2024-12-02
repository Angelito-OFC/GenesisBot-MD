import axios from 'axios';
import yts from 'yt-search';

// Handler principal
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `⚠️ Necesitas proporcionar una consulta de búsqueda.\n\nEjemplo: *${usedPrefix}${command} Rosa pastel*`,
    }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
    return;
  }

  try {
    // Mensaje inicial para el proceso
    let statusMessage = await conn.sendMessage(m.chat, { text: '🔎 Buscando video...' }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // Buscar video
    let videoData = await searchVideo(text);
    if (!videoData) {
      await conn.sendMessage(m.chat, {
        text: '⚠️ No se encontraron resultados. Intenta con una búsqueda más específica.',
      }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return;
    }

    // Actualizar mensaje con los detalles del video
    await updateStatusMessage(conn, statusMessage, videoData, '🎥 Video encontrado. Preparando descarga...');

    // Descargar video
    const { videoUrl, audioUrl } = await downloadMedia(videoData.url, text);
    if (!videoUrl || !audioUrl) {
      await conn.sendMessage(m.chat, {
        text: '⚠️ No se pudo descargar el video o audio. Por favor inténtalo de nuevo.',
      }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return;
    }

    // Descargar y enviar video
    await updateStatusMessage(conn, statusMessage, videoData, '⬇️ Descargando video...');
    await sendVideoFile(conn, m, videoData, videoUrl);

    // Descargar y enviar audio
    await updateStatusMessage(conn, statusMessage, videoData, '⬇️ Descargando audio...');
    await sendAudioFile(conn, m, videoData, audioUrl);

    // Finalizar proceso
    await updateStatusMessage(conn, statusMessage, videoData, '✅ Video y audio descargados con éxito.');
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error:', error);
    await conn.sendMessage(m.chat, {
      text: '⚠️ Ocurrió un error inesperado. Intenta de nuevo más tarde.',
    }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

// Buscar video en YouTube
async function searchVideo(query) {
  let results = await yts(query);
  return results.videos.length ? results.videos[0] : null;
}

// Actualizar estado del mensaje
async function updateStatusMessage(conn, message, videoData, status) {
  await conn.sendMessage(message.key.remoteJid, {
    text: `🔰 *Admin-TK Downloader*\n\n🎵 *Título:* ${videoData.title}\n⏳ *Duración:* ${videoData.duration.timestamp}\n👁️ *Vistas:* ${videoData.views}\n📅 *Publicado:* ${videoData.ago}\n🌐 *Enlace:* ${videoData.url}\n\n🕒 *${status}*`,
    edit: message.key,
  });
}

// Descargar media usando la API
async function downloadMedia(url, text) {
  const qualities = ['1080p', '720p', '480p', '360p', '240p', '144p'];
  for (let quality of qualities) {
    try {
      const response = await axios.get(`https://Ikygantengbangetanjay-api.hf.space/yt?query=${encodeURIComponent(text)}&quality=${quality}`);
      const result = response.data.result;
      if (!result) throw new Error('No media found.');
      if (result.duration.seconds > 3600 || result.filesize > 200 * 1024 * 1024) throw new Error('Media too large.');
      return {
        videoUrl: result.download.video,
        audioUrl: result.download.audio,
      };
    } catch (error) {
      console.error(`Error downloading at ${quality}:`, error.message);
    }
  }
  throw new Error('No media could be downloaded.');
}

// Enviar video descargado
async function sendVideoFile(conn, m, videoData, videoUrl) {
  await conn.sendMessage(m.chat, {
    video: { url: videoUrl },
    mimetype: 'video/mp4',
    fileName: `${videoData.title}.mp4`,
    caption: `🎥 *${videoData.title}*\n📽 *Fuente:* ${videoData.url}`,
  }, { quoted: m });
}

// Enviar audio descargado
async function sendAudioFile(conn, m, videoData, audioUrl) {
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    mimetype: 'audio/mpeg',
    fileName: `${videoData.title}.mp3`,
  }, { quoted: m });
}

handler.help = ['play2 *<consulta>*', 'playvideo *<consulta>*'];
handler.tags = ['downloader'];
handler.command = /^(play2|playvideo)$/i;

export default handler;