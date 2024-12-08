
let handler = async (m, { conn, usedPrefix, command }) => {
  let text = `Harap masukkan opsi yang valid.\n\nList opsi yang tersedia:\n`
  text += `--info\n--name\n--desk\n--follow\n--unfollow\n--react\n--setpp\n--delpp\n--mute\n--unmute\n\n`
  text += `Contoh: ${usedPrefix + command} --react jid, id, emoji`

  let args = m.text.slice(command.length + usedPrefix.length).trim().split(/\s+/)
  let option = args[0]?.toLowerCase() || ''

  if (option === '--info') {
    let code = args[1]?.trim()
    if (!code) throw `Format salah! Contoh: ${usedPrefix + command} --info code`
    let zenith = await conn.newsletterMetadata("invite", code)
    let hasil = `
ID: ${zenith.id}
State: ${zenith.state}
Creation Time: ${new Date(zenith.creation_time * 1000).toLocaleString()}
Name: ${zenith.name}
Description: ${zenith.description}
Invite: ${zenith.invite}
Subscribers: ${zenith.subscribers}
Verification: ${zenith.verification}
`
    await m.reply(hasil)
    return
  }

  if (option === '--name') {
    let [jid, ...nameParts] = args.slice(1)
    let name = nameParts.join(' ').trim()
    if (!jid || !name) throw `Format salah! Contoh: ${usedPrefix + command} --name jid, name`
    await conn.newsletterUpdateName(jid, name)
    await m.reply(`Berhasil memperbarui nama!\n\nJID: ${jid}\nNama Baru: ${name}`)
    return
  }

  if (option === '--desk') {
    let [jid, ...deskParts] = args.slice(1)
    let desk = deskParts.join(' ').trim()
    if (!jid || !desk) throw `Format salah! Contoh: ${usedPrefix + command} --desk jid, desk`
    await conn.newsletterUpdateDescription(jid, desk)
    await m.reply(`Berhasil memperbarui deskripsi!\n\nJID: ${jid}\nDeskripsi Baru: ${desk}`)
    return
  }

  if (option === '--follow') {
    let jid = args[1]?.trim()
    if (!jid) throw `Format salah! Contoh: ${usedPrefix + command} --follow jid`
    await conn.newsletterFollow(jid)
    await m.reply(`Berhasil mengikuti newsletter!\n\nJID: ${jid}`)
    return
  }

  if (option === '--unfollow') {
    let jid = args[1]?.trim()
    if (!jid) throw `Format salah! Contoh: ${usedPrefix + command} --unfollow jid`
    await conn.newsletterUnfollow(jid)
    await m.reply(`Berhasil berhenti mengikuti newsletter!\n\nJID: ${jid}`)
    return
  }

  if (option === '--react') {
    let [jid, id, emoji] = args.slice(1).join(' ').split(',').map(v => v.trim())
    if (!jid || !id || !emoji) throw `Format salah! Contoh: ${usedPrefix + command} --react jid, id, emoji`
    await conn.newsletterReactMessage(jid, id, emoji)
    await m.reply(`Berhasil mengirim reaksi!\n\nJID: ${jid}\nID Pesan: ${id}\nEmoji: ${emoji}`)
    return
  }

  if (option === '--setpp') {
    let jid = args[1]?.trim()
    let q = m.quoted || m
    let mime = q.mimetype || q.mediaType || ''
    if (!jid || !/image/.test(mime)) throw `Harap kirimkan gambar yang valid untuk mengubah gambar profil!`
    let buff = await q.download()
    await conn.newsletterUpdatePicture(jid, buff)
    await m.reply(`Berhasil memperbarui gambar profil!\n\nJID: ${jid}`)
    return
  }

  if (option === '--delpp') {
    let jid = args[1]?.trim()
    if (!jid) throw `Format salah! Contoh: ${usedPrefix + command} --delpp jid`
    await conn.newsletterRemovePicture(jid)
    await m.reply(`Berhasil menghapus gambar profil!\n\nJID: ${jid}`)
    return
  }

  if (option === '--mute') {
    let jid = args[1]?.trim()
    if (!jid) throw `Format salah! Contoh: ${usedPrefix + command} --mute jid`
    await conn.newsletterMute(jid)
    await m.reply(`Berhasil menonaktifkan notifikasi!\n\nJID: ${jid}`)
    return
  }

  if (option === '--unmute') {
    let jid = args[1]?.trim()
    if (!jid) throw `Format salah! Contoh: ${usedPrefix + command} --unmute jid`
    await conn.newsletterUnmute(jid)
    await m.reply(`Berhasil mengaktifkan notifikasi!\n\nJID: ${jid}`)
    return
  }

  throw text
}

handler.help = ['newsletter --opsi']
handler.tags = ['channel']
handler.command = /^(newsletter)$/i

export default handler