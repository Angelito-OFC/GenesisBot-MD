import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  // Verifica si es una imagen o un video
  if (!mime.startsWith('image/') && !mime.startsWith('video/')) {
    return m.reply('Responde a una *Imagen o Video.*');
  }

  await m.react('✅');

  // Descarga el archivo adjunto
  let media = await q.download();
  let formData = new FormData();
  formData.append('files[]', media, { filename: q.filename || 'file' });

  try {
    // Llama a la API de pomf2.lain.la
    let api = await axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Verifica si la respuesta contiene la URL del archivo subido
    if (api.data && api.data.files && api.data.files[0]) {
      let uploadedFile = api.data.files[0];
      let txt = `*Pomf2 Uploader*\n\n`;
      txt += `» *Nombre*: ${uploadedFile.name}\n`;
      txt += `» *Tamaño*: ${uploadedFile.size} bytes\n`;
      txt += `» *Enlace*: ${uploadedFile.url}\n\n`;
      txt += `© By: Genesis`;

      // Envía el enlace al chat
      await conn.sendFile(m.chat, uploadedFile.url, uploadedFile.name, txt, m);
      await m.react('✅');
    } else {
      m.reply('Error en la subida: Archivo no permitido o servidor ocupado.');
    }
  } catch (err) {
    console.error('Error al subir archivo:', err.response?.data || err.message);
    m.reply('No se pudo completar la subida. Verifica el archivo y vuelve a intentarlo.');
  }
};

handler.tags = ['convertir'];
handler.help = ['tourl2'];
handler.command = /^(tourl2|topomf)$/i;
handler.register = true;
export default handler;
