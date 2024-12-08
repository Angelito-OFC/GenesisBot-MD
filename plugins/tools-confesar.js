let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero|mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hola.`);
    let [jid, pesan] = text.split('|');
    if ((!jid || !pesan)) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero|mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hola.`);
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw m.reply('🤍 El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🤍 No puedes mandarte un mensaje a ti mismo.');
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    let id = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 3 dígitos
    let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje de confesión.\n\nID: ${id}\nMensaje: \n${pesan}\n\n¿Quieres responder a este mensaje? Simplemente escribe tu respuesta y envíala. Más tarde la transmitiré al remitente.`.trim();
    await conn.relayMessage(data.jid, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S A R',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: ''
                }
            }
        }
    }, {}).then(() => {
        m.reply('*🤍 Mensaje enviado con éxito.*')
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        }
        return !0
    })
}

handler.tags = ['tools']
handler.help = ['mfs'].map(v => v + ' <número|mensaje>')
handler.command = /^(mfs|confesar|memfes|confes)$/i
handler.register = true
handler.private = true

export default handler






/* let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero|mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hola.`);
    let [jid, pesan] = text.split('|');
    if ((!jid || !pesan)) throw m.reply(`*🤍 Ejemplo:*\n\n${usedPrefix + command} numero|mensaje\n\n*🤍 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Hola.`);
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw m.reply('🤍 El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🤍 No puedes mandarte un mensaje a ti mismo.');
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    let id = +new Date
    let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje de confesión.\n\nId: ${id}\nMensaje: \n${pesan}\n\n¿Quieres responder a este mensaje? Simplemente escribe tu respuesta y envíala. Más tarde la transmitiré al remitente.`.trim();
    await conn.relayMessage(data.jid, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S A R',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: ''
                }
            }
        }
    }, {}).then(() => {
        m.reply('*🤍 Mensaje enviado con éxito.*')
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        }
        return !0
    })
}

handler.tags = ['tools']
handler.help = ['mfs'].map(v => v + ' <número|mensaje>')
handler.command = /^(mfs|confesar|memfes|confes)$/i
handler.register = true
handler.private = true

export default handler */
