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
    let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje de confesión.\n\n*ID:* ${id}\n*Mensaje:* \n${pesan}\n\n¿Quieres responder a este mensaje? Simplemente escribe tu respuesta y envíala. Más tarde la transmitiré al remitente.`.trim();
    
    try {
        // Usa sendMessage como prueba
        await conn.sendMessage(jid, { text: teks, mentions: [data.jid] });
        m.reply(`*🤍 Mensaje enviado con éxito.*\n\n*ID del mensaje:* ${id}`);
        
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        };
    } catch (e) {
        console.error(e);
        m.reply('❌ Ocurrió un error al enviar el mensaje.');
    }
}

handler.tags = ['tools'];
handler.help = ['mfs'].map(v => v + ' <número mensaje>');
handler.command = /^(mfs|confesar|memfes|confes)$/i;
handler.register = true;
handler.private = true;

export default handler;
