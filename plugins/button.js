const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
const config = require('../config');

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
              subtitle: 'Sadeesha',
              hasMediaAttachment: true,
              ...mediaMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"YouTube 🎊\",\"url\":\"https://youtube.com/@Sadeesha_Coder\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"WebSite 🎈\",\"url\":\"link\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"GitHub 📚\",\"url\":\"https://github.com/sadiyamin\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                     "name": "cta_url",
                     "buttonParamsJson": "{\"display_text\":\"WhatsApp 🌷\",\"url\":\"https://whatsapp.com/channel/0029VaD5t8S1nozDfDDjRj2J\",\"merchant_url\":\"https://www.google.com\"}"
                  },
                  {
                    "name": "quick_reply",
                    "buttonParamsJson": `{"display_text":"1","id":"1"}`
                  },
                  {
                    "name": "quick_reply",
                    "buttonParamsJson": `{"display_text":"2","id":"2"}`
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
       const sadeeSend = await conn.relayMessage(from, msg.message, {
          messageId: msg.key.id
        });
    console.log('Button Send Sucsses');

        const sadeeID = sadeeSend.mek;
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === sadeeID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } }); 
if (messageType === '1') {
                const down =  await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${video.url}`);
                const downloadUrl = down.result.dl_link;
    await conn.sendMessage(from, { 
                        audio: { url: downloadUrl }, 
                        mimetype: "audio/mpeg" ,
                        contextInfo: {
                            externalAdReply: {
                                title: data.title,
                                body: data.videoId,
                                mediaType: 1,
                                sourceUrl: data.url,
                                thumbnailUrl: data.thumbnail, // This should match the image URL provided above
                                renderLargerThumbnail: true,
                                showAdAttribution: true
                            }
                        }
                    
                    }, { quoted: mek });
                    await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } else if (messageType === '2') {
                const down =  await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${url}`);
                const downloadUrl = down.result.dl_link;
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                      await conn.sendMessage(from, { delete: sentMsg.key });
                }
            }
        });

                
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
