const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
/*
cmd({
    pattern: "sadee",
    desc: "button test",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    if (!q) return reply(`*Need title*`);
        let search = await yts(q);
        let videos = search.all;
        console.log(videos)
        if (!videos || videos.length === 0) {
          reply('No video found');
          return;
        }
        // Choose between 1 and 5 videos at random
        const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
        const selectedVideos = [];
        while (selectedVideos.length < numVideos) {
          const randomIndex = Math.floor(Math.random() * videos.length);
          const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
          selectedVideos.push(randomVideo);
        }
        let push = [];
        for (let i = 0; i < selectedVideos.length; i++) {
          let video = selectedVideos[i];
          let cap = `Title : ${video.title}`;
          let foot = `© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·`;
          const mediaMessage = await prepareWAMessageMedia({ image: { url: video.thumbnail } }, { upload: conn.waUploadToServer });
          push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: cap
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: foot
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `Video ${i + 1}`,
              subtitle: '',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"YouTube 🌹\",\"url\":\"https://youtube.com/@DGXeon\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"WebSite 💧\",\"url\":\"https://t.me/xeonbotinc\",\"merchant_url\":\"https://www.google.com\"}"
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
                    "buttonParamsJson": `{"display_text":"Owner 👤","id":".owner"}`
                  },
                  {
                    "name": "quick_reply",
                    "buttonParamsJson": `{"display_text":"Script 📃","id":".repo"}`
                }
              ]
            })
          });
        }
        let sadee = `LARA - MD`;
        let foot2 = `ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·`;
        const msg = generateWAMessageFromContent(from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: sadee
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: foot2
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: push
                }),
                contextInfo: {
                      mentionedJid: ['94779062397@s.whatsapp.net'], 
                      forwardingScore: 999,
                      isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363192254044294@newsletter',
                      newsletterName: 'lara',
                      serverMessageId: 143
                    }
                    }
              })
            }
          }
        }, {quoted:mek});
        await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
*/
      cmd({
    pattern: "pakaya",
    desc: "button test",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
          let foot = `© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·`;
         let msg = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Hi ${pushName}\nPlease click on the button below`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: foot
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : {url:`https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/daenerys%20targaryen.jpeg`}}, { upload: conn.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: foot,
                  hasMediaAttachment: false  
                }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": `{"title":"SELECT REPLY 🐛",
"sections":[{"title":"SELECT THE REPLY BELOW",
"highlight_label":"OWNER'S FAVOURITE",
"rows":[{"header":"CHANNEL + LINK THUMB",
"title":"CHOOSE ",
"description":"CHANNEL + LINK THUMB",
"id":"v4"},
{"header":"LARGE LINK + THUMBNAIL",
"title":"CHOOSE ",
"description":"LARGE LINK + THUMBNAIL",
"id":"v3"},
{"header":"LINK + FAKE THUMBNAIL",
"title":"CHOOSE ",
"description":"LINK + FAKE THUMBNAIL",
"id":"v2"},
{"header":"QUOTED NORMALLY",
"title":"CHOOSE ",
"description":"QUOTED NORMALLY",
"id":"v1"}
]
}
]
}`
              }
           ],
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: 120363192254044294@newsletter,
                  newsletterName: foot,
                  serverMessageId: 143
                }
                }
        })
    }
  }
}, { quoted: mek })

await conn.relayMessage(from, msg.message, {
  messageId: msg.key.id
})
}
