//Thanks to https://github.com/NajmyW

import { randomBytes } from "crypto"
import axios from "axios"

let handler = async (m, { conn, text }) => {
    if (!text) throw 'how i can assist you today??';
    try {
        conn.reply(m.chat, wait, m);
        let data = await chatGpt(text)
        conn.reply(m.chat, data, m);
    } catch (err) {
        m.reply('error cik:/ ' + err);
    }
}

handler.command = handler.help = ['gptdemo'];
handler.tags = ['gptdemo'];
handler.limit = 3;

export default handler;

async function chatGpt(query){
try {

const { id_ }= (await axios.post("https://chat.chatgptdemo.net/new_chat",{user_id: "crqryjoto2h3nlzsg"},{headers:{
"Content-Type": "application/json",

}})).data

const json = {"question":query,"chat_id": id_,"timestamp":new Date().getTime()}


const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream",json,{headers:{
"Content-Type": "application/json",

}})
const cek = data.split("data: ")

let res = []

for (let i=1; i < cek.length; i++){
if (cek[i].trim().length > 0){
res.push(JSON.parse(cek[i].trim()))
}}

return res.map((a) => a.choices[0].delta.content).join("")

} catch (error) {
console.error("Error parsing JSON:",error)
return 404
}
}