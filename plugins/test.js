import fetch from 'node-fetch';

let undefined = {};

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Gunakan format:\n${usedPrefix + command} <pertanyaan>\n\nContoh:\n${usedPrefix + command} Apa itu AI?`;

  try {
 
    if (undefined[m.sender]) {
      text = `${undefined[m.sender]}\n${text}`; 
    }

    let url = `https://loco.web.id/wp-content/uploads/api/v1/bingai.php?q=${encodeURIComponent(text)}`;
    let response = await fetch(url);

    if (!response.ok) throw 'No se pudo contactar con la API. Por favor, inténtalo de nuevo más tarde.';

    let json = await response.json();

    if (!json.status || !json.result || !json.result.ai_response) {
      throw 'Lo sentimos, no hay resultados relevantes para su pregunta.';
    }

    let aiResponse = json.result.ai_response.trim();
    let searchResults = json.result.search_results || [];
    let firstResult = searchResults[0]; 

    let searchSummary = '';
    if (firstResult) {
      searchSummary = `**Hasil Pencarian:**\n${firstResult.title}\n[Link](${firstResult.url})`;
    } else {
      searchSummary = '';
    }

  undefined[m.sender] = text;
 
    let resultMessage = `${aiResponse}\n${searchSummary}`;

    m.reply(resultMessage);
  } catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
  }
};

handler.help = ['bingai '];
handler.tags = ['internet'];
handler.command = /^bingai$/i; 

export default handler;
