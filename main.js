const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('message',ms=>{
    if (ms.content=='ping'){
        ms.reply('pong');
    }
})

client.login(process.env.DISCORD_TOKEN);