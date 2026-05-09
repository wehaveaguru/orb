const {SlashCommandBuilder, userMention, User}=require('discord.js')


module.exports= {data: new SlashCommandBuilder().setName('hello').setDescription('Replies with username')
        .addUserOption(option=> option.setName('user').setDescription('Pings and says hlo')),
    async execute(interaction){
        await interaction.reply(`Wassup ${interaction.user}!`);
        
    }
}

