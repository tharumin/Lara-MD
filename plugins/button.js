const { cmd, commands } = require('../command');

cmd({
  pattern: "button",
  desc: "button test",
  react: "🎵",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    const templateButtons = [
  {index: 1, urlButton: {displayText: '⭐ Star Baileys on GitHub!', url: 'https://github.com/adiwajshing/Baileys'}},
]

const buttonMessage = {
    text: "Hi it's a template message",
    templateButtons: templateButtons,
    image: {url: 'https://i.ibb.co/gzDsLsb/IMG-20241127-WA0023.jpg'}
}

await conn.sendMessage(from, templateMessage)
await await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/gzDsLsb/IMG-20241127-WA0023.jpg'} // Ensure `img.allmenu` is a valid image URL or base64 encoded image
             }, { quoted: mek })  
      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})
