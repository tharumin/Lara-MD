const { 
  generateWAMessageFromContent, 
  prepareWAMessageMedia, 
  generateWAMessageContent, 
  proto 
} = require("@whiskeysockets/baileys");

const { 
  cmd, 
  commands 
} = require("../command");

const fetch = require("node-fetch");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");
const yts = require("yt-search");

function someFunction(param1, param2, param3, param4, param5) {
  return anotherFunction(param5 + 0x2b, param4);
}


const tiktokCommand = {
  pattern: "ttsearch",
  alias: ["tiktoksearch"],
  desc: "Search TikTok videos",
  use: "<query>",
  category: "search",
  react: '🔎',
  filename: __filename
};

cmd(tiktokCommand, async (sendMessage, message, args, context) => {
  const { from, quoted, body, isCmd, command, args: commandArgs, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply } = context;

  const promptMessage = { text: "*[❗] What do you want to search on TikTok?*" };
  const quotedMessage = { quoted: message };

  if (!q) {
    return sendMessage(from, promptMessage, quotedMessage);
  }

  try {
    let searchResult = await tiktokSearch(q);
    if (!searchResult.status) {
      throw new Error(searchResult.result);
    }
    let results = searchResult.result;
    shuffleArray(results);
    let topResults = results.slice(0, 7);
    let videoMessages = await Promise.all(topResults.map(video => createVideoMessage(video.videoUrl, sendMessage)));

    const headerMessage = { text: '' };
    const footerMessage = { text: "© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·" };
    const buttonOptions = { buttons: [] };

    let interactiveMessages = videoMessages.map((videoMessage, index) => ({
      body: proto.Message.InteractiveMessage.Body.fromObject(headerMessage),
      footer: proto.Message.InteractiveMessage.Footer.fromObject(footerMessage),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: topResults[index].description,
        hasMediaAttachment: true,
        videoMessage: videoMessage
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(buttonOptions)
    }));

    const deviceListMetadata = { deviceListMetadata: {}, deviceListMetadataVersion: 2 };
    const bodyMessage = { text: "*LARA-MD TIKTOK SEARCH*\n\n🔎 *Searched text :* " + q + "\n\n> © ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴄᴏᴅᴇʀ · · ·" };
    const footerText = { text: '' };
    const headerNoMedia = { hasMediaAttachment: false };
    const carouselMessages = { cards: interactiveMessages };
    const quotedReply = { quoted: message };

    const finalMessage = generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: deviceListMetadata,
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create(bodyMessage),
            footer: proto.Message.InteractiveMessage.Footer.create(footerText),
            header: proto.Message.InteractiveMessage.Header.create(headerNoMedia),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject(carouselMessages)
          })
        }
      }
    }, quotedReply);

    await sendMessage.relayMessage(from, finalMessage.message, { messageId: finalMessage.key.id });
  } catch (error) {
    const errorMessage = { quoted: message };
    await sendMessage(from, { text: error.toString() }, errorMessage);
  }
});

async function tiktokSearch(query) {
  try {
    const searchParams = new URLSearchParams({
      keywords: query,
      count: '10',
      cursor: '0',
      HD: '1'
    });

    const response = await axios.post("https://tikwm.com/api/feed/search", searchParams, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        'Cookie': "current_language=en",
        'User-Agent': "Mozilla/5.0 (Linux Android 10 K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    });

    const videos = response.data.data.videos;

    if (videos.length === 0) {
      return { status: false, result: "No videos found." };
    }

    return {
      status: true,
      result: videos.map(video => ({
        description: video.title ? video.title : "No description",
        videoUrl: video.play ? video.play : "No URL"
      }))
    };
  } catch (error) {
    return { status: false, result: error.message };
  }
}

async function createVideoMessage(videoUrl, sendMessage) {
  try {
    const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
    const videoData = response.data;

    const videoContent = { video: videoData };
    const uploadOptions = { upload: sendMessage.waUploadToServer };

    const { videoMessage } = await generateWAMessageContent(videoContent, uploadOptions);
    return videoMessage;
  } catch (error) {
    throw new Error("Error creating video message: " + error.message);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
