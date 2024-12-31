const { cmd, commands } = require('../command');
const yts = require('yt-search');
const config = require('../config');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
cmd({
    pattern: "sadee",
    desc: "button test",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
let xmenu_oh = `
╭──❍「 *GREETING* 」❍
├ *Hi 👋* 
├  😄
╰─┬────❍
╭─┴❍「 *GUIDE* 」❍
├ *🅞 = For Owner* 
├ *🅕 = For Free User*
├ *🅟 = For Premium User*
╰─┬────❍
`
let msg = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Sadeesha'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'lara-md'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: xmenu_oh,
            subtitle: 'hi',
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"YouTube 🌹\",\"url\":\"https://youtube.com/@DGXeon\",\"merchant_url\":\"https://www.google.com\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"Telegram 💧\",\"url\":\"https://t.me/xeonbotinc\",\"merchant_url\":\"https://www.google.com\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"GitHub 🔘\",\"url\":\"https://github.com/DGXeon\",\"merchant_url\":\"https://www.google.com\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"WhatsApp ☘️\",\"url\":\"https://whatsapp.com/channel/0029VaG9VfPKWEKk1rxTQD20\",\"merchant_url\":\"https://www.google.com\"}"
              },
              {
  "name": "quick_reply",
  "buttonParamsJson": `{"display_text":"Allmenu 🗂️","id":"${config.prefix}allmenu"}`
   },
              {
                "name": "quick_reply",
                "buttonParamsJson": `{"display_text":"Owner 👤","id":"${config.prefix}owner"}`
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": `{"display_text":"Script 📃","id":"${config.prefix}script"}`
              }
           ],
          })
        })
    }
  }
}, { quoted: mek })
await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
