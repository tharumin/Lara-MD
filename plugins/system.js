
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "system",
    desc: "Check bot online or no.",
    category: "main",
    react: "📟",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    let status = `
───────────────────
_*⚙️ Lααɾα Ｓｙｓｔｅｍ  Ｉｎｆｏ ⚙️*_
───────────────────

┌────────────────
│❖ *ᴜᴘᴛɪᴍᴇ :* _${runtime(process.uptime())}_
│❖ *ʀᴀᴍ ᴜꜱᴀɢᴇ :*  _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
│❖ *ʜᴏꜱᴛ ɴᴀᴍᴇ :* _${os.hostname()}_
│❖ *ᴏᴡɴᴇʀ :* _Sadeesha Tharumin_
└────────────────

> ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴇᴇꜱʜᴀ ᴛʜᴀʀᴜᴍɪɴ    
`
await conn.sendMessage(from, { text: status }, { quoted: mek })
}catch(e){
    console.log(e)
    reply(`${e}`)
    }
    })


//__________ping______

cmd({
    pattern: "ping",
    desc: "Check bot online or no.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*pong...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*⚬Lααɾα-ᴍᴅ ꜱᴘᴇᴇᴅ : ${ping}ms*_` }, { quoted: mek })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//Owner
cmd({
    pattern: "owner",
    desc: "cmd",
    category: "system",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let cap = `
┏━┫*⚬Lααɾα-ᴍᴅ⚬*┣━✾
┃
┣━━━━━━━━━━━━━━━
- Sᴀᴅᴇᴇsʜᴀ 💗⃤
        94779062397
╰━━━━━━━━━━━━━━━
╭━━━━━━━━━━━━━━━
- Vɪʜᴀɴɢᴀ 💗⃤
        94718276378
╰━━━━━━━━━━━━━━━
╭━━━━━━━━━━━━━━━
- Sᴀᴅᴇᴇᴘᴀ 💗⃤
        94716605423
╰━━━━━━━━━━━━━━━
╭━━━━━━━━━━━━━━━
- Nɪsʜɪᴛʜᴀ 💗⃤
        94719069703
╰━━━━━━━━━━━━━━━

> Lααɾα-ᴍᴅ
`
return await conn.sendMessage(from,{image: {url: `https://i.ibb.co/zQg9dzm/IMG-20241025-WA0018.jpg`},caption: cap},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//______________restart_____________

cmd({
    pattern: "restart",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const {exec} = require("child_process")
reply("*restarting...*")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
