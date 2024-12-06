let cooldowns = {}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let poin = 300
    let tiempoEspera = 5 * 1000
    let user = global.db.data.users[m.sender]
 
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera - Date.now()) / 1000))
        return conn.reply(m.chat, `[ ✰ ] Ya has iniciado una apuesta recientemente, espera *⏱ ${tiempoRestante}* para apostar nuevamente.`, m, rcanal)
    }

    cooldowns[m.sender] = Date.now()

    if (!text) return conn.reply(m.chat, '[ ✰ ] Elige una opción ( *piedra/papel/tijera* ) para empezar el juego.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* piedra`, m, rcanal)

    let opciones = ['piedra', 'papel', 'tijera']
    let astro = opciones[Math.floor(Math.random() * opciones.length)]

    if (!opciones.includes(text)) return conn.reply(m.chat, '[ ✰ ] Elige una opción ( *piedra/papel/tijera* ) para empezar el juego.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* piedra`, m, rcanal)

    let resultado = ''
    let puntos = 0

    if (text === astro) {
        resultado = `[ ✿ ]︎ Fue un empate!! ten *100 🤍 Corazones* como recompensa`
        puntos = 100
    } else if (
        (text === 'piedra' && astro === 'tijera') ||
        (text === 'tijera' && astro === 'papel') ||
        (text === 'papel' && astro === 'piedra')
    ) {
        resultado = `[ ✰ ]︎ GANASTE!! acabas de ganar *300 🤍 Corazones*`
        puntos = poin
    } else {
        resultado = `[ ✿︎ ] PERDISTE!! acabas de perder *300 🤍 Corazones*`
        puntos = -poin
    }

    user.limit += puntos
    conn.reply(m.chat, `${resultado}`, m, rcanal)
}

handler.help = ['ppt']
handler.tags = ['game']
handler.command = ['ppt']
//handler.group = true
handler.register = true
export default handler

function segundosAHMS(segundos) {
    return `${segundos % 60} segundos`
}