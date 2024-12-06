

let handler = async (m, { args }) => {
   let user = global.db.data.users[m.sender]
   if (!args[0]) return m.reply('🤍 Ingresa la cantidad de *🤍 corazones* que deseas Depositar.')
   if ((args[0]) < 1) return m.reply('🤍 Ingresa una cantidad válida de *🤍 corazones.')
   if (args[0] == 'all') {
      let count = parseInt(user.limit)
      user.corazones -= count * 1
      user.bank += count * 1
      await m.reply(`Depositaste *${count} 🤍 corazones* al Banco.`)
      return !0
   }
   if (!Number(args[0])) return m.reply('🤍 La cantidad deve ser un Numero.')
   let count = parseInt(args[0])
   if (!user.corazones) return m.reply('No tienes *🤍 corazones* en la Cartera.')
   if (user.corazones < count) return m.reply(`Solo tienes *${user.corazones} 🤍 corazones* en la Cartera.`)
   user.corazones -= count * 1
   user.bank += count * 1
   await m.reply(`Depositaste *${count} 🤍 corazones* al Banco.`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'dep', 'd']
handler.register = true 
export default handler 