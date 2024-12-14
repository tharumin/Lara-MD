const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions')

const axios = require('axios');
const cheerio = require('cheerio');

async function ytmp4(url, format) {
  try {
    if (!url || !format) {
      throw new Error('url and format parameters are required.');
    }

    const quality = parseInt(format.replace('p', ''), 10);
    const firstUrl = 'https://ab.cococococ.com/ajax/download.php';
    const firstParams = {
      button: 1,
      start: 1,
      end: 1,
      format: quality,
      url
    };

      const headers = {
      Accept: '*/*',
     'Accept-Encoding': 'gzip, deflate, br',
     'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      Origin: 'https://loader.to',
      Referer: 'https://loader.to',
      'Sec-Ch-Ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    };

    const firstResponse = await axios.get(firstUrl, { params: firstParams, headers });
    const id = firstResponse.data.id;

    const checkProgress = async () => {
      const secondUrl = 'https://p.oceansaver.in/ajax/progress.php';
      const secondParams = { id };

      try {
        const secondResponse = await axios.get(secondUrl, { params: secondParams, headers });
        const { progress, download_url, text } = secondResponse.data;

        if (text === "Finished") {
          return download_url;
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return checkProgress();
        }
      } catch (error) {
        throw new Error(`Error in progress check: ${error.message}`);
      }
    };

    return await checkProgress();
  } catch (error) {
    console.error('Error:', error);
   return { error: error.message };
  }
}

module.exports = {ytmp4}



// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

cmd({
    pattern: "song",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
◉┏━┫*⚬Lααɾα-ꜱᴏɴɢ⚬*┣━✾
◉┃            *ᴸ  ͣ  ͣ  ͬ  ͣ  ✻  ᴸ  ͣ  ͣ  ͬ  ͣ*
┏┻━━━━━━━━━━━━━
┃*Lααɾα-ᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ ✻*
┗━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━
❍*ᴛɪᴛʟᴇ :* ${data.title}
❍*ᴅᴜʀᴀᴛɪᴏɴ :* ${data.timestamp}
❍*ᴠɪᴇᴡꜱ :* ${data.views}
❍*ᴜᴘʟᴏᴀᴅ ᴏɴ :* ${data.ago}
┗━━━━━━━━━━━━━━━
╭──┬┬┬┬┬┬┬┬┬┬┬──
│        *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀͨᴅͦᴇͩᴇͤꜱͬʜᴀ*
╰──┴┴┴┴┴┴┴┴┴┴┴──

🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ*
*ᴅᴏᴡɴʟᴏᴀᴅ ꜰʀᴏᴍᴀᴛ*

*ᴅᴏᴡɴʟᴏᴀᴅ ᴀᴜᴅɪᴏ 🎧*

*1*     ┃  *ᴀᴜᴅɪᴏ*

*ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ 📁*

*2*     ┃  *ᴅᴏᴄᴜᴍᴇɴᴛ*

> Lααɾα-ᴍᴅ ✻
`;
let info = `
*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·*
 `;   
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: desc,
  contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363192254044294@newsletter',
                    newsletterName: "Lααɾα-ᴍᴅ ✻",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'LARA MD',
                    body: 'ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/sadiyamin",
                    thumbnailUrl: 'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});

      const messageID = sentMsg.key.id; // Save the message ID for later reference


        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });         
                const down =  await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${url}`);
                const downloadUrl = down.result.dl_link;

                // React to the upload (sending the file)
                await conn.sendMessage(from, { delete: sentMsg.key });
                await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });  

                if (messageType === '1') {
                    // Handle option 1 (Audio File)
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
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "audio/mp3",
                        fileName: `${data.title}.mp3`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});  
//.video commands
cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
◉┏━┫*⚬Lααɾα-ᴠɪᴅᴇᴏ⚬*┣━✾
◉┃            *ᴸ  ͣ  ͣ  ͬ  ͣ  ✻  ᴸ  ͣ  ͣ  ͬ  ͣ*
┏┻━━━━━━━━━━━━━
┃*Lααɾα-ᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ✻*
┗━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━
❍*ᴛɪᴛʟᴇ :* ${data.title}
❍*ᴅᴜʀᴀᴛɪᴏɴ :* ${data.timestamp}
❍*ᴠɪᴇᴡꜱ :* ${data.views}
❍*ᴜᴘʟᴏᴀᴅ ᴏɴ :* ${data.ago}
┣━━━━━━━━━━━━━━━
┣━━┬┬┬┬┬┬┬┬┬┬┬━━
┃        *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀͨᴅͦᴇͩᴇͤꜱͬʜᴀ*
┗━━┴┴┴┴┴┴┴┴┴┴┴━━

🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ*
*ᴅᴏᴡɴʟᴏᴀᴅ ꜰʀᴏᴍᴀᴛ*

*ᴅᴏᴡɴʟᴏᴀᴅ ᴠɪᴅᴇᴏ 🎬*

*1.1*     ┃  *360ᴘ*
*1.2*     ┃  *480ᴘ*
*1.3*     ┃  *720ᴘ*
*1.4*     ┃  *1080ᴘ*

*ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ 📁*

*2.1*     ┃  *360ᴘ*
*2.2*     ┃  *480ᴘ*
*2.3*     ┃  *720ᴘ*
*2.4*     ┃  *1080ᴘ*

> Lααɾα-ᴍᴅ ✻
`;
let info = `
*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·*
`;    
const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
            caption: desc,
  contextInfo: {
                mentionedJid: ['94779062397@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363192254044294@newsletter',
                    newsletterName: "Lααɾα-ᴍᴅ ✻",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'LARA MD',
                    body: 'ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/sadiyamin",
                    thumbnailUrl: 'https://raw.githubusercontent.com/tharumin/Alexa_Voice/refs/heads/main/20241214_204755.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
const messageID = sentMsg.key.id; // Save the message ID for later reference


        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;
        
            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
        
            if (isReplyToSentMsg) {
                // React to the user's reply (the "1" or "2" message)
                await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
if (messageType === '1.1') {
                    const down = await ytmp4(`${url}`,"360p")                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info}, { quoted: mek });
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
}else if (messageType === '1.2') {
                    const down = await ytmp4(`${url}`,`480`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info}, { quoted: mek });
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }else if (messageType === '1.3') {
                    const down = await ytmp4(`${url}`,`720`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info}, { quoted: mek });
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
}else if (messageType === '1.4') {
                    const down = await ytmp4(`${url}`,`1080`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info}, { quoted: mek });
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
       }else if (messageType === '2.1') {
                    const down = await ytmp4(`${url}`,`360`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
      }else if (messageType === '2.2') {
                    const down = await ytmp4(`${url}`,`480`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
  }else if (messageType === '2.3') {
                    const down = await ytmp4(`${url}`,`720`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
}else if (messageType === '2.4') {
                    const down = await ytmp4(`${url}`,`1080`)                     
                    const downloadUrl = down;
                    // React to the upload (sending the file)
                    await conn.sendMessage(from, { delete: sentMsg.key })
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    // Handle option 1 (Audio File)
                    // Handle option 2 (Document File)
                    await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                    } 
                }        
        
      });

} catch (e) {
console.log(e);
reply(`${e}`);
}
});

cmd({
    pattern: "yta",
    alias: "ytmp3",
    react: "⬇️",
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply('*Need a YouTube URL!*')      
          const prog =  await fetchJson(`https://www.dark-yasiya-api.site/download/ytmp3?url=${q}`);
          const downloadUrl = prog.result.dl_link;


            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: mek });
        } catch (e) {
            console.log('First attempt failed:', e);

            try {
                const prog = await dlyta(q);

            await conn.sendMessage(from, { audio: { url: prog.dl_link }, mimetype: 'audio/mpeg' }, { quoted: mek });
            } catch (error) {
                console.log('Second attempt failed:', error);
                await reply('*Failed to process the request. Please try again later!*');
            }
        }
    }
)            
