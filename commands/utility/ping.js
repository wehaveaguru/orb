const {SlashCommandBuilder}=require('discord.js');

module.exports={data: new SlashCommandBuilder.setName('ping').setDescription("Replies with Pong ig"),
    async execute(interaction){
        await interaction.reply(`This command was called by ${interaction.user.username} who joined at ${interaction.member.joinedAt}`)
    }
}

