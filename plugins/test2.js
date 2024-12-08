let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender];
    const ownerNumber = '628xx'; // Nomor owner

    if (command === 'demoprem') {
        if (m.sender === `${ownerNumber}@s.whatsapp.net`) {
            m.reply(`✅ *Propietario de la demostración gratuita*\n\nPuedes activar la demostración en cualquier momento sin límites.`);
            return;
        }
        if (user.demoUsed) {
            return m.reply(`⚠️ Ha utilizado la demostración premium antes o la canceló. No puedes reclamar otra demostración. Comuníquese con el propietario para comprar la prima.`);
        }
        let demoDuration = 7; //7hari
        let demoTime = 86400000 * demoDuration;
        let now = new Date();
        user.premium = true;
        user.premiumTime = now.getTime() + demoTime;
        user.demoUsed = true;

        let demoEndDate = new Date(user.premiumTime).toLocaleDateString();

        await m.reply(`✅ *Demostración Premium activa* \n\n*Nama:* ${user.name}\n*Durasi:* ${demoDuration} Hari\n*Mulai:* ${now.toLocaleDateString()}\n*Berakhir:* ${demoEndDate}`);
        setTimeout(async () => {
            if (user.premium && user.premiumTime <= Date.now()) {
                user.premium = false;
                user.premiumTime = 0;

                const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Await Owner\nTEL;TYPE=CELL;waid=628xxx:+628xxx\nEND:VCARD`;

                conn.sendMessage(m.chat, {
                    contacts: {
                        displayName: 'Await Owner',
                        contacts: [{ vcard }],
                    },
                });

                conn.reply(m.sender, `⚠️ *Finaliza el período de demostración premium*\n\nHai ${user.name}, Su período de demostración premium ha expirado. Comuníquese con el propietario para comprar la prima.`, null);
            }
        }, demoTime);
    } else if (command === 'canceldemo') {
        if (m.sender === `${ownerNumber}@s.whatsapp.net`) {
            m.reply(`✅ *El propietario es libre de cancelar la demostración*\n\nPuede cancelar la demostración en cualquier momento sin límites.`);
            return;
        }

        if (!user.premium || !user.demoUsed) {
            return m.reply(`⚠️ Actualmente no estás en el período de demostración premium.`);
        }
        user.premium = false;
        user.premiumTime = 0;

        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Await Owner\nTEL;TYPE=CELL;waid=628xxx:+628xxx\nEND:VCARD`;

        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: 'Await Owner',
                contacts: [{ vcard }],
            },
        });

        await m.reply(`⚠️ *Demostración premium cancelada*\n\nSu demostración premium ha sido cancelada. No puedes reclamar otra demostración. Comuníquese con el propietario para comprar la prima.`);
    }
};

handler.help = ['demoprem', 'canceldemo'];
handler.tags = ['premium'];
handler.command = /^(demoprem|canceldemo)$/i;
export default handler;