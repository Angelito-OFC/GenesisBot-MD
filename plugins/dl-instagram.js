import { snapsave } from '@bochilteam/scraper'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw m.reply('✧ Ingresa el link de *Instagram*')
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const data = await snapsave(url);
        
        // Find the HD video
        let video = data.results[0];

        if (video) {
            const videoBuffer = await fetch(video.url).then(res => res.buffer());
            const caption = `✧ Para: @${sender}`;

            await conn.sendMessage(
                m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `video.mp4`,
                    caption: caption,
                    mentions: [m.sender],
                }, {
                    quoted: m
                }
            );
        } else {
            throw m.reply('Error');
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `Error: ${error}`, m);
    }
}

handler.help = ['ig'].map(v => v + ' <link>')
handler.tags = ['dl']

handler.command = /^(ig(dl)?)$/i
handler.limit = true
handler.register = true

export default handler