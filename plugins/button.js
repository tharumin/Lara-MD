const { cmd, commands } = require('../command');
const yts = require('yt-search');
const config = require('../config');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');

cmd({
  pattern: "ponnaya",
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
           { buttonId: 'callToAction', buttonText: { displayText: 'Visit Website' }, type: 1, url: 'recipient_phone_number@s.whatsapp.net' },
         ],
         headerType: 1,
       };

       await conn.sendMessage(jid, buttonMessage);
     };
      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})

