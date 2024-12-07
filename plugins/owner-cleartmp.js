import { tmpdir } from 'os'
import path, { join } from 'path'
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {

  const tmp = [tmpdir(), join(__dirname, '../tmp')];
  const filenames = [];

  tmp.forEach(dirname => {
    readdirSync(dirname).forEach(file => {
      filenames.push(join(dirname, file));
    });
  });

  const deletedFiles = [];

  filenames.forEach(file => {
    const stats = statSync(file);

    if (stats.isDirectory()) {
      console.log(`Skipping directory: ${file}`);
    } else {
      unlinkSync(file);
      deletedFiles.push(file);
    }
  });

  conn.reply(m.chat, '✧ Listo!', m);

  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
    conn.reply(m.chat, `Archivos eliminados:\n${deletedFiles.join('\n')}`, m);
  }

  if (deletedFiles.length == 0) {
    conn.reply(m.chat, 'No hay archivos para limpiar en tmp', m);
  }
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|clear|tmpclear|cleantmp)$/i
handler.rowner = true

export default handler