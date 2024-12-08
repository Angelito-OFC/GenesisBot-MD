let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {};
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    let split = text.trim().split(/ (.+)/); // Divide el texto en dos partes: número y mensaje
    let jid = split[0]; // El primer elemento es el número
    let pesan = split[1]; // El resto es el mensaje
    
    if (!jid || !pesan) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw m.reply('🤍 El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🤍 No puedes mandarte un mensaje a ti mismo.');
    
    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return !0;
    
    let id = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
    let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje de confesión.\nPara responder\nEjemplo: .respuesta <id> <Mensaje>\n\n*\`ID:\`* ${id}\n*\`MENSAJE:\`* \n\n${pesan}`.trim();
    
    await conn.relayMessage(data.jid, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S A R - G E N E S I S',
                    body: '¡responder! .respuesta (id) (Mensaje)',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: ''
                }
            }
        }
    }, {}).then(() => {
        m.reply(`*🤍 Mensaje enviado con éxito.*\n\n*ID del mensaje:* ${id}`);
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        };
        return !0;
    });
}

handler.tags = ['tools'];
handler.help = ['mfs'].map(v => v + ' <número mensaje>');
handler.command = /^(mfs|confesar|memfes|confes)$/i;
handler.register = true;
handler.private = true;

export default handler;
