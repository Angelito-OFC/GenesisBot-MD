
import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if(!text) throw "You Searching AI\nContoh: .you hallo";
  try {
  let nganu = await fetch(`https://api.arifzyn.tech/ai/you-search?q=${text}`);
  let anumu = await nganu.json();
  await m.reply(anumu.result);
  } catch (e) {
  throw "Error Mint 😹";
  }
};

handler.help = ['you'];
handler.tags = ['ai'];
handler.command = ['you','youai','yousearch'];
handler.limit = true
export default handler;