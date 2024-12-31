const { cmd, commands } = require('../command');
const yts = require('yt-search');
const config = require('../config');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');

cmd({
  pattern: "pakaya",
  desc: "button test",
  react: "🎵",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
const sendButtonMessage = async (jid) => {
       const buttonMessage = {
         text: "Hello! This is an interactive message with action buttons.",
         footer: "Choose an option below",
         buttons: [
           { buttonId: 'id1', buttonText: { displayText: 'Visit Website' }, type: 1, url: 'https://your-website.com' },
           { buttonId: 'id2', buttonText: { displayText: 'Reply' }, type: 1 },
         ],
         headerType: 1,
       };

       await conn.sendMessage(jid, buttonMessage);

     // Example usage: Replace 'recipient_phone_number@s.whatsapp.net' with actual recipient JID
     sendButtonMessage('94701898308@s.whatsapp.net');
   }


      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})

