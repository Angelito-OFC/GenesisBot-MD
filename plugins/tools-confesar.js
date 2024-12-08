let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}; // Aseguramos que conn.menfess esté inicializado
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    let split = text.trim().split(/ (.+)/); // Divide el texto en dos partes: número y mensaje
    let jid = split[0]; // El primer elemento es el número
    let pesan = split[1]; // El resto es el mensaje

    if (!jid || !pesan) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Formateamos el número
    let data = (await conn.onWhatsApp(jid))[0] || {}; // Verificamos si el número está registrado
    if (!data.exists) throw m.reply('🤍 El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🤍 No puedes mandarte un mensaje a ti mismo.');
    
    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return !0; // Si ya existe un mensaje, no procesamos más
    
    let id = Math.floor(1000 + Math.random() * 9000); // Generamos un ID aleatorio
    let teks = `*Hola* @${data.jid.split("@")[0]}, *recibiste un mensaje de confesión.*\n*Para* responder\n*Ejemplo: .respuesta <id> <Mensaje>*\n\n*\`ID:\`* *${id}*\n*\`MENSAJE:\`* \n\n${pesan}`.trim();
    
    try {
        // Enviamos el mensaje de confesión
        let sentMessage = await conn.sendMessage(data.jid, {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S A R - G E N E S I S',
                    body: '¡responder! .respuesta (id) (Mensaje)',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'
                }
            }
        });
        
        // Si el mensaje se envió correctamente, guardamos la información en conn.menfess
        if (sentMessage) {
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: false // El mensaje no ha sido respondido aún
            };
            return conn.reply(m.chat, '*🤍 Respuesta enviada con éxito.*\n\n*ID del mensaje original:*' + ` *${id}*`, m, { quoted: m });
        }
        
    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al enviar la respuesta.');
    }
}

handler.tags = ['tools'];
handler.help = ['mfs'].map(v => v + ' <número mensaje>');
handler.command = /^(mfs|confesar|memfes|confes)$/i;
handler.register = true;
handler.private = true;

export default handler;
