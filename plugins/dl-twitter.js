/* 
- Twitter Downloader By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import axios from 'axios';
let enviando = false;

const handler = async (m, {conn, text, usedPrefix, command, args}) => {
    if (!args || !args[0]) return conn.reply(m.chat, '*Ingresa un enlace de Twitter*', m)
    if (enviando) return; 
    enviando = true;

    try {
 
        const apiResponse = await axios.get(`https://deliriussapi-oficial.vercel.app/download/twitterdl?url=${args[0]}`);
        const res = apiResponse.data;

        if (res?.type === 'video') {
            
            const caption = res.caption ? res.caption : '*TWITTER - VIDEO*';
            for (let i = 0; i < res.media.length; i++) {

                await conn.sendMessage(m.chat, { video: { url: res.media[i].url }, caption: caption }, { quoted: m });
            }

            enviando = false;
            return;
        
        } else if (res?.type === 'image') {
            
            const caption = res.caption ? res.caption : '*TWITTER - IMAGEN*';
            for (let i = 0; i < res.media.length; i++) {
                await conn.sendMessage(m.chat, { image: { url: res.media[i].url }, caption: caption }, { quoted: m });
            }

            enviando = false;
            return;
        }

    } catch (error) {
        
        enviando = false;
        console.error(error);         
        conn.reply(m.chat, `Error al descargar su archivo`, m);
    }
};

handler.help = ['twitter <url>']
handler.tags = ['dl']
handler.command = /^(x|twt|twitter(dl)?)$/i
export default handler;
