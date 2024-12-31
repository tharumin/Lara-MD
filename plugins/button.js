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
    await conn.sendMessage(from,{
      title: "Sadeesha",
      text: "Hi",
      buttons: [
        {
          name: "single_select",
          buttonParamsJson: JSON
          .stringify({
            title: "Menu",
            sections: [
              title: "fuck me",
              highlight_label: "fuck",
              rows: [
                {
                  header: "Sadeesha",
                  title: "Menu1",
                  description: "Description",
                  id: ".menu",
                }
                ]
              ];
              
          })
        }
        ];
    }
    
      } catch (e) {
      console.log(e);
      reply(`${e}`);
  }
})
