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
       const templateMessage = {
         text: "Check out this cool item!",
         footer: "Click below for more options",
         buttons: [
           { buttonId: 'id1', buttonText: { displayText: 'View More' }, type: 1 },
           { buttonId: 'id2', buttonText: { displayText: 'Share' }, type: 1 },
         ],
         headerType: 4,
         image: { url: 'https://example.com/image.jpg' },
       };

       await conn.sendMessage(from, templateMessage);
       console.log('Views card message sent successfully');



      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})

