let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id>|<mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234|Gracias por tu confesión.`);
    
    let [id, pesan] = text.split('|');
    if (!id || !pesan) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id>|<mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234|Gracias por tu confesión.`);
    
    id = id.trim();
    pesan = pesan.trim();
    
    // Verificar que exista el ID en la base de datos
    if (!conn.menfess[id]) throw m.reply(`*🤍 Error:* No se encontró ningún mensaje con el ID *${id}*.`);
    
    let { dari, penerima } = conn.menfess[id];
    
    if (m.sender !== penerima) throw m.reply('🤍 No tienes permiso para responder a este mensaje.');
    
    // Construir el mensaje para el remitente original
    let teks = `Hola, recibiste una respuesta a tu mensaje anónimo.\n\n*ID:* ${id}\n*Respuesta:* \n${pesan}\n\n¡Gracias por usar el servicio de confesiones!`.trim();
    await conn.relayMessage(dari, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [dari],
                externalAdReply: {
                    title: 'R E S P U E S T A',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: ''
                }
            }
        }
    }, {}).then(() => {
        m.reply(`*🤍 Respuesta enviada con éxito.*\n\n*ID del mensaje original:* ${id}`);
        
        // Actualizar el estado del mensaje original
        conn.menfess[id].status = true;
        return !0;
    });
}

handler.tags = ['tools']
handler.help = ['respuesta'].map(v => v + ' <id|mensaje>')
handler.command = /^(respuesta|reply)$/i
handler.register = true
handler.private = true

export default handler;
