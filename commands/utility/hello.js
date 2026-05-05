const {SlashCommandBuilder, userMention, User}=require('discord.js')


module.exports= {data: new SlashCommandBuilder().setName('hello').setDescription('Replies with username'),
    async execute(interaction){
        await interaction.reply(`Wassup ${interaction.user}!`)
    }
}

