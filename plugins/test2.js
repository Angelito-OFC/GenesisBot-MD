import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `Envía el comando con el formato: ${usedPrefix}${command} <prompt>\n\nEjemplo: ${usedPrefix}${command} paisaje hermoso`,
      m
    );
  }

  await m.react('⏳'); // Indica que el proceso está en curso.

  try {
    const result = await fluximg.create(text);
    if (result && result.imageLink) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: result.imageLink },
          caption: `🌟 Imagen generada con éxito:\n\nPrompt: ${text}`,
        },
        { quoted: m }
      );
      await m.react('✅'); // Reacciona al completar.
    } else {
      throw new Error("Error al crear la imagen. Por favor, inténtalo nuevamente.");
    }
  } catch (error) {
    console.error(error);
    await m.react('❌'); // Indica que hubo un error.
    conn.reply(m.chat, "Ocurrió un error al generar la imagen. Inténtalo de nuevo.", m);
  }
};

handler.help = ["flux <prompt>"];
handler.tags = ["tools"];
handler.command = ["flux"];

export default handler;

const fluximg = {
  defaultRatio: "2:3", // Relación de aspecto predeterminada.

  create: async (query) => {
    const apiUrl = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image`;
    const config = {
      headers: {
        accept: "*/*",
        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
        "user-agent": "Postify/1.0.0",
      },
      timeout: 5000, // Establece un tiempo de espera de 5 segundos.
    };

    try {
      const { data } = await axios.get(
        `${apiUrl}?prompt=${encodeURIComponent(query)}&aspect_ratio=${fluximg.defaultRatio}`,
        config
      );
      if (data && data.image_link) {
        return { imageLink: data.image_link };
      }
      throw new Error("Respuesta inesperada del servidor.");
    } catch (error) {
      console.error("Error al solicitar la imagen:", error.message);
      throw error;
    }
  },
};
