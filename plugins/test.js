
let botVersion = '1.0.0'; // Versi default awal
const versionHistory = [];
const ownerNumber = '628xxx'; 
const handler = async (m, { conn, args, command }) => {
  const senderNumber = m.sender.split('@')[0];
  
  if (command === 'setversion') {
    if (m.sender !== `${ownerNumber}@s.whatsapp.net`)
      return conn.sendMessage(m.chat, { text: '❌ Hanya owner yang dapat mengubah versi bot!' }, { quoted: m });

    const newVersion = args.join(' ').trim();
    if (!newVersion) return conn.sendMessage(m.chat, { text: '❗ Silakan masukkan versi baru!' }, { quoted: m });

    // Update versi dan simpan ke history
    versionHistory.push({ version: botVersion, updatedBy: m.sender, date: new Date() });
    botVersion = newVersion;

    const groups = await conn.groupFetchAllParticipating();
    const groupIds = Object.keys(groups);

    for (const groupId of groupIds) {
      await conn.sendMessage(groupId, {
        text: `🚀 *Bot Version Update*\n\n🔖 *Versi Baru:* ${botVersion}\n📝 *Diubah oleh:* @${senderNumber}\n📅 *Tanggal:* ${new Date().toLocaleString()}\n\nNikmati fitur terbaru dengan versi ini!`,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: '🔔 Bot Version Update',
            body: `Versi Bot Kini: ${botVersion}`,
            mediaType: 1,
            sourceUrl: '',
            renderLargerThumbnail: true,
            thumbnailUrl: 'https://example.com/version-thumbnail.jpg', // gambar
          },
        },
      });
    }

    await conn.sendMessage(m.chat, { text: '✅ Versi bot berhasil diubah dan disiarkan ke semua grup!' }, { quoted: m });

  } else if (command === 'version') {
    const versionInfo = `🤖 *Bot Version Info*\n\n🔖 *Versi Saat Ini:* ${botVersion}\n🕒 *Terakhir Diubah:* ${
      versionHistory.length > 0 ? versionHistory[versionHistory.length - 1].date.toLocaleString() : 'Belum pernah diubah'
    }\n✍️ *Diubah oleh:* ${
      versionHistory.length > 0 ? '@' + versionHistory[versionHistory.length - 1].updatedBy.split('@')[0] : 'System'
    }`;

    await conn.sendMessage(m.chat, {
      text: versionInfo,
      mentions: versionHistory.length > 0 ? [versionHistory[versionHistory.length - 1].updatedBy] : [],
      contextInfo: {
        externalAdReply: {
          title: '📄 Bot Version',
          body: `Versi Bot: ${botVersion}`,
          mediaType: 1,
          sourceUrl: '',
          thumbnailUrl: 'https://example.png', //gambar
        },
      },
    }, { quoted: m });
  }
};

handler.help = ['setversion versi', 'version'];
handler.tags = ['info', 'owner'];
handler.command = /^(setversion|version)$/i;
export default handler;