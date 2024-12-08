import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Masukkan link.\nContoh: *.tera https://krakenfiles.com/view/jumGvugviY/file.html*';
  
  m.reply('Tunggu sebentar...');

  let url = encodeURIComponent(args[0]);
  let apiUrl = `https://xzn.wtf/api/krakendl?url=${url}&apikey=mufar`;
  
  let res = await fetch(apiUrl);
  let json = await res.json();

  if (json.status === 'ok') {
    let fileInfo = json;
    let message = `
Nama File: ${fileInfo.file_name}
Ukuran File: ${fileInfo.file_size}
Tanggal Unggah: ${fileInfo.upload_date}
Tanggal Terakhir Diunduh: ${fileInfo.last_download_date}
Tipe File: ${fileInfo.type}
Jumlah Tampilan: ${fileInfo.views}
Jumlah Unduhan: ${fileInfo.downloads}
    `;
    await conn.reply(m.chat, message, m);

    // Periksa ukuran file sebelum mengirim
    let fileSizeInMB = parseFloat(fileInfo.file_size.split(' ')[0]);
    if (fileSizeInMB > 100) {
      throw 'Maaf, file melebihi batas ukuran yang diizinkan (100MB).';
    }

    // Mengirim file
    await conn.sendFile(m.chat, fileInfo.url, fileInfo.file_name, '', m);
  } else {
    throw 'Tidak ada informasi yang ditemukan untuk tautan yang diberikan';
  }
};

handler.help = ['kraken'];
handler.tags = ['downloader'];
handler.command = /^(kraken)$/i;
handler.limit = true;

export default handler;