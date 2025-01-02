const {cmd,commands} = require('../command')
const {fetchJson} = require('../lib/functions')
const cheerio = require('cheerio')

cmd({
  pattern: 'pussy',
  alias: ["dlpussyb", "pussybdown", "hentaivid"],
  desc: "Download adult videos from pussyboy.net.",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (bot, message, context, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  query,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    // React to the message with an emoji
    await context.react('🔞');

    // Construct the video URL
    const videoUrl = "https://www.pussyboy.net/porn/" + query + '/';

    // Fetch the webpage
    const response = await fetch(videoUrl);
    const html = await response.text();

    // Parse the HTML content
    const $ = cheerio.load(html);

    // Extract the video source URL
    const videoSource = $("body > div.container-xxl.videos > div.col-md-12.videos-detail > div.col-md-12.videos-details > div > video > source").attr("src");

    // Send the video as a message
    await bot.sendMessage(from, {
      video: { url: videoSource },
      mimetype: "video/mp4",
      caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·*"
    }, { quoted: message });
  } catch (error) {
    // Log the error and reply with the error message
    console.error(error);
    reply('Error: ' + error.message);
  }
});
