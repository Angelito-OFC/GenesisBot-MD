import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  // Verifica si es imagen o video
  if (!mime.startsWith('image/') && !mime.startsWith('video/')) {
    return m.reply('Responde a una *Imagen o Video.*');
  }

  await m.react('✅');

  // Descarga el archivo adjunto
  let media = await q.download();
  let formData = new FormData();
  formData.append('files[]', media, { filename: 'file' });

  // Llama a la API de pomf2.lain.la
  try {
    let api = await axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Verifica si la respuesta contiene la URL del archivo subido
    if (api.data && api.data.files && api.data.files[0]) {
      let uploadedFile = api.data.files[0];
      let txt = `*Pomf2 Uploader*\n\n`;
      txt += `» *Nombre*: ${uploadedFile.name || 'desconocido'}\n`;
      txt += `» *Tamaño*: ${uploadedFile.size} bytes\n`;
      txt += `» *Enlace*: ${uploadedFile.url}\n\n`;
      txt += `© By: Genesis`;

      await conn.sendFile(m.chat, uploadedFile.url, uploadedFile.name, txt, m);
      await m.react('✅');
    } else {
      m.reply('Error al subir el archivo.');
    }
  } catch (err) {
    console.error(err);
    m.reply('Hubo un error al intentar subir el archivo.');
  }
};

handler.tags = ['convertir'];
handler.help = ['tourl'];
handler.command = /^(tourl|topomf)$/i;
handler.register = true;
export default handler;
