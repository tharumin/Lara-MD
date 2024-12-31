const { fetchJson } = require('../lib/functions');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pornhub",
    alias: ["phdl"],
    react: "🎥",
    desc: "download pornhub videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://www.pornhub.com")) return reply("*`Need valid pornhub url`*");
m.react('⬇️');
const response = await axios.get(`https://www.dark-yasiya-api.site/download/phub?url=${q}`);
const sadee = response.data;
const title = sadee.result.video_title;
const id = sadee.result.video_display_id;
const uploder = sadee.result.video_uploader;
const uploadDate = sadee.result.video_upload_date;
const duration = sadee.result.analyze_time;
const url = sadee.result.orginal_url;
m.react('⬆️');
let cap = `
*LARA-MD PORNHUB DWNLOAD*

*Title* : ${title}
*Video ID* : ${id}
*Uploader* : ${uploader}
*Upload Date* : ${uploadDate}
*Duration* : ${duration}
*Url* : ${url}

> Lara-MD
`
await conn.sendMessage(from, {
            image: { url: sadee.result.video_cover},
            caption: cap,
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



} catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});