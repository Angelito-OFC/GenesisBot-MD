const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `🤍 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙧𝙚𝙥𝙤𝙧𝙩𝙚\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*${usedPrefix + command} el comando ${usedPrefix}play no manda nada*`;
  if (text.length < 10) throw `🤍 𝙀𝙡 𝙧𝙚𝙥𝙤𝙧𝙩𝙚 𝙙𝙚𝙗𝙚 𝙨𝙚𝙧 𝙙𝙚 𝙢𝙞𝙣𝙞𝙢𝙤 10 𝙘𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙚𝙨`;
  if (text.length > 1000) throw `🤍 𝙀𝙡 𝙧𝙚𝙥𝙤𝙧𝙩𝙚 𝙙𝙚𝙗𝙚 𝙨𝙚𝙧 𝙙𝙚 𝙢𝙖𝙭𝙞𝙢𝙤 1000 𝙘𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙚𝙨`;
  const teks = `
𝗠𝗘𝗡𝗦𝗔𝗝𝗘:\n• ${text}\n\n•╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍•\n𝗔𝗧𝗧:
• wa.me/${m.sender.split`@`[0]}\n𝘙𝘦𝘱𝘰𝘳𝘵𝘦 𝘥𝘦 𝘦𝘳𝘳𝘰𝘳𝘦𝘴...`;
  conn.reply('59897246324@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, {contextInfo: {mentionedJid: [m.sender]}});

await m.react('📨');
await m.reply(`\`-ˋˏ ༻🤍 𝙀́𝙓𝙄𝙏𝙊 🤍༺ ˎˊ-\`\n\n𝘌𝘭 𝘳𝘦𝘱𝘰𝘳𝘵𝘦 𝘢 𝘴𝘪𝘥𝘰 𝘦𝘯𝘷𝘪𝘢𝘥𝘰 𝘢𝘮𝘪 𝘤𝘳𝘦𝘢𝘥𝘰𝘳. 
𝘛𝘦𝘯𝘥𝘳𝘢 𝘶𝘯𝘢 𝘳𝘦𝘴𝘱𝘶𝘦𝘴𝘵𝘢 𝘱𝘳𝘰𝘯𝘵𝘰.
𝘋𝘦 𝘴𝘦𝘳 𝘧𝘢𝘭𝘴𝘰 𝘴𝘦𝘳𝘢 𝘪𝘨𝘯𝘰𝘳𝘢𝘥𝘰 𝘴𝘶 𝘳𝘦𝘱𝘰𝘳𝘵𝘦.`)
};
handler.help = ['reporte', 'request'].map((v) => v + ' <teks>');
handler.tags = ['info'];
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i;
export default handler;