import { jidNormalizedUser } from "@adiwajshing/baileys";
import Jadibots from "../lib/jadibots.js";
let handler = async (m, { conn, text, isOwner }) => {
    const parent = await Jadibots.conn;
    let jid = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : conn.user?.jid || jidNormalizedUser(conn.user?.id);
    if (!jid || jid === "@s.whatsapp.net") throw m.reply('Numero no valido');
    if (jid !== conn.user?.jid && !isOwner) throw m.reply('Solo puede ser usado por mi owner');
    const number = jid.split('@')[0];
    if (!number) throw m.reply('Numero no valido');
    if (!Jadibots.conns.has(number)) throw m.reply('Bot no activo');
    await conn.reply(m.chat, "Goodbye bot!", m);
    await Jadibots.conns.get(number)?.end?.();
    await Jadibots.conns.delete(number);
};

handler.help = ["stopjadibot"];
handler.tags = ["serbot"];
handler.command = /^stop(jadi)?bot$/i;

export default handler;
