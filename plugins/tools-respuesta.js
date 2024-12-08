let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);
    
    let split = text.trim().split(/ (.+)/); // Divide el texto en dos partes: ID y mensaje
    let id = split[0]; // El primer elemento es el ID
    let pesan = split[1]; // El resto es el mensaje

    if (!id || !pesan) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);
    
    id = id.trim();
    pesan = pesan.trim();
    
    // Verificar que exista el ID en la base de datos
    if (!conn.menfess[id]) throw m.reply(`*🤍 Error:* No se encontró ningún mensaje con el ID *${id}*.`);
    
    let { dari, penerima } = conn.menfess[id];
    
    if (m.sender !== penerima) throw m.reply('🤍 No tienes permiso para responder a este mensaje.');
    
    // Construir el mensaje para el remitente original
    let teks = `Hola, recibiste una respuesta a tu mensaje anónimo.\n\n*ID:* ${id}\n*Respuesta:* \n${pesan}\n\n¡Gracias por usar el servicio de confesiones!`.trim();
    
    try {
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
        });
        m.reply(`*🤍 Respuesta enviada con éxito.*\n\n*ID del mensaje original:* ${id}`);
        
        // Actualizar el estado del mensaje original
        conn.menfess[id].status = true;
    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al enviar la respuesta.');
    }
}

handler.tags = ['tools'];
handler.help = ['respuesta'].map(v => v + ' <id mensaje>');
handler.command = /^(respuesta|reply)$/i;
handler.register = true;
handler.private = true;

export default handler;
