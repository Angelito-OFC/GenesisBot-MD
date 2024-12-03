/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Vtuber News 
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

import axios from 'axios';
import cheerio from 'cheerio';

const nazandCoder = async (url) => {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const newsList = [];
    $('.row .col-12 .border').each((i, el) => {
      const title = $(el).find('a span').text().trim();
      const link = $(el).find('a').attr('href');
      const date = $(el).find('.text-secondary').text().trim();
      newsList.push({ title, link, date });
    });
    return newsList;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { conn }) => {
  const url = 'https://hololist.net/news/';
  const newsList = await nazandCoder(url);
  const pp = 'https://pomf2.lain.la/f/b0pf8oxg.jpg';

  if (newsList && newsList.length > 0) {
    const randomNews = Math.random() < 0.5 ? newsList[0] : newsList[newsList.length - 1];  
    await conn.sendMessage(m.chat, {
      text: `📰 ${randomNews.title}*\n📅 ${randomNews.date}\n🔗 ${randomNews.link}`,
      contextInfo: {
        externalAdReply: {
          title: randomNews.title,
          body: randomNews.date,
          showAdAttribution: true,
          mediaType: 1,
          sourceUrl: randomNews.link,
          thumbnailUrl: pp,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m.quoted || m });
  } else {
    await conn.sendMessage(m.chat, { text: '❌ Tidak dapat mengambil berita Vtuber saat ini.' }, { quoted: m.quoted || m });
  }
};

handler.help = ['vnews'];
handler.tags = ['internet'];
handler.command = /^vnews$/i;
export default handler;