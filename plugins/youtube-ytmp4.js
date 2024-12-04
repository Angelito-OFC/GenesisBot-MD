import axios from 'axios';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Ejemplo:\n${usedPrefix + command} https://terabox.com/s/1kReYr_2pyxLZ2c2kEAHF3A`);
  try {
    const result = await terabox(text);
    if (!result.length) return m.reply('ingresa un url válido.');

    for (let i = 0; i < result.length; i++) {
      const { fileName, type, thumb, url } = result[i];
      const caption = `📄 *Nombre File:* ${fileName}\n📂 *Formato:* ${type}`;
      
      await conn.sendFile(m.chat, url, fileName, caption, m, false, {
        thumbnail: thumb ? await getBuffer(thumb) : null
      });
    }
  } catch (err) {
    console.error(err);
    m.reply('error al descargar el archivo.');
  }
};
handler.help = ["teraboxdl *<url>*"];
handler.tags = ["downloader"];
handler.command = ["teraboxdl"];

export default handler;

//SCRAPE BY SYAII: https://whatsapp.com/channel/0029VaezPea1t90dvAkhNg3k/301
async function terabox(url) {
  return new Promise(async (resolve, reject) => {
    await axios
      .post('https://teradl-api.dapuntaratya.com/generate_file', {
        mode: 1,
        url: url
      })
      .then(async (a) => {
        const array = [];
        for (let x of a.data.list) {
          let dl = await axios
            .post('https://teradl-api.dapuntaratya.com/generate_link', {
              js_token: a.data.js_token,
              cookie: a.data.cookie,
              sign: a.data.sign,
              timestamp: a.data.timestamp,
              shareid: a.data.shareid,
              uk: a.data.uk,
              fs_id: x.fs_id
            })
            .then((i) => i.data)
            .catch((e) => e.response);

          if (!dl.download_link) continue;

          array.push({
            fileName: x.name,
            type: x.type,
            thumb: x.image,
            url: dl.download_link.url_1
          });
        }
        resolve(array);
      })
      .catch((e) => reject(e.response.data));
  });
}


async function getBuffer(url) {
  try {
    const res = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
/*
*<>TERABOXDL, DOSA TANGGUNG SENDIRI!!<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
SCRAPE BY SYAII:  https://whatsapp.com/channel/0029VaezPea1t90dvAkhNg3k/301
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
SELASA, 03 NOVEMBER 20:16
*/