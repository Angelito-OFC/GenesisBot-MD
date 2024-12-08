let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);
    
    let split = text.trim().split(/ (.+)/); // Divide el texto en dos partes: ID y mensaje
    let id = split[0]; // El primer elemento es el ID
    let pesan = split[1]; // El resto es el mensaje

    if (!id || !pesan) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} <id> <mensaje>\n\n*🤍 Uso:* ${usedPrefix + command} 1234 Gracias por tu confesión.`);
    
    id = id.trim();
    pesan = pesan.trim();

    // Agregar consola para verificar el contenido de conn.menfess
    console.log("conn.menfess", conn.menfess); // Verifica todo el contenido de conn.menfess
    
    // Verificar que exista el ID en la base de datos
    if (!conn.menfess || !conn.menfess[id]) {
        throw m.reply(`*🤍 Error:* No se encontró ningún mensaje con el ID *${id}*.`);
    }
    
    let { dari, penerima } = conn.menfess[id];
    
    if (m.sender !== penerima) throw m.reply('🤍 No tienes permiso para responder a este mensaje.');
    
    // Construir el mensaje para el remitente original
    let teks = `*Hola, recibiste una respuesta a tu mensaje anónimo.*\n\n*\`ID:\`* *${id}*\n*\`RESPUESTA:\`* \n\n${pesan}`.trim();
    
    try {
        
        let sentMessage = await conn.sendMessage(dari, {
            text: teks,
            contextInfo: {
                mentionedJid: [dari],
                externalAdReply: {
                    title: 'R E S P U E S T A - G E N E S I S',
                    body: '¡Gracias por usar el servicio de confesiones!',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
                }
            }
        });
        
        if (sentMessage) {
           return conn.reply(m.chat, '*🤍 Respuesta enviada con éxito.*\n\n*ID*' + ` *${id}*`, m, fake);
            
            // Actualizar el estado del mensaje original
            conn.menfess[id].status = true;
        } else {
            throw new Error('No se pudo enviar el mensaje.');
        }
    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al enviar la respuesta. Asegúrate de que el número es válido y que el remitente puede recibir mensajes.');
    }
};

handler.tags = ['tools'];
handler.help = ['respuesta'].map(v => v + ' <id mensaje>');
handler.command = /^(respuesta|reply)$/i;
handler.register = true;
handler.private = true;

export default handler;
