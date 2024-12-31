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
     const sendButtonMessage = async (text, footer, buttons) => {
       const buttonMessage = {
         text: text,
         footer: footer,
         buttons: buttons,
         headerType: 1,
       };

       await conn.sendMessage(from, buttonMessage);
       console.log('Button message sent successfully');
     };
const messageText = 'Hello! This is an interactive message with buttons.';
     const footerText = 'Choose an option below';
     const buttons = [
       { buttonId: 'id1', buttonText: { displayText: 'Option 1' }, type: 1 },
       { buttonId: 'id2', buttonText: { displayText: 'Option 2' }, type: 1 },
     ];

     await conn.sendButtonMessage(from, messageText, footerText, buttons);


      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})

