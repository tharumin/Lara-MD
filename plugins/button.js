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
conn.ev.on('messages.upsert', async (m) => {
       console.log(JSON.stringify(m, undefined, 2));
       console.log('Replying to', m.messages[0].key.remoteJid);
       await conn.sendMessage(m.messages[0].key.remoteJid, {
         text: 'Hello there!',
         type: 'template',
         template: {
           namespace: '94779062397@s.whatsapp.net',
           name: '94779062397@s.whatsapp.net',
           language: {
             policy: 'deterministic',
             code: 'en_US',
           },
           components: [
             {
               type: 'body',
               parameters: [
                 {
                   type: 'text',
                   text: 'This is an interactive message!',
                 },
               ],
             },
             {
               type: 'button',
               sub_type: 'quick_reply',
               index: '0',
               parameters: [
                 {
                   type: 'payload',
                   payload: 'BUTTON_1_PAYLOAD',
                 },
               ],
             },
             {
               type: 'button',
               sub_type: 'call_to_action',
               index: '1',
               parameters: [
                 {
                   type: 'payload',
                   payload: '94779062397@s.whatsapp.net',
                 },
               ],
             },
           ],
         },
       });
     });

      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})

