const { cmd, commands } = require('../command');

cmd({
  pattern: "button",
  desc: "button test",
  react: "🎵",
  category: "download",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    
     // Function to send a button message
     const sendButtonMessage = async (jid, text, footer, buttons) => {
       const buttonMessage = {
         text: text,
         footer: footer,
         buttons: buttons,
         headerType: 1,
       };

       await conn.sendMessage(jid, buttonMessage);
       console.log('Button message sent successfully');
     };

     // Example usage: Replace 'recipient_phone_number@s.whatsapp.net' with the recipient JID
     const recipientJid = '94779062397@s.whatsapp.net';
     const messageText = 'Hello! This is an interactive message with buttons.';
     const footerText = 'Choose an option below';
     const buttons = [
       { buttonId: 'id1', buttonText: { displayText: 'Option 1' }, type: 1 },
       { buttonId: 'id2', buttonText: { displayText: 'Option 2' }, type: 1 },
     ];

     sendButtonMessage(recipientJid, messageText, footerText, buttons);


    
      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})
