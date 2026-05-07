const {SlashCommandBuilder, EmbedBuilder}=require('discord.js')

module.exports={data: new SlashCommandBuilder().setName('welcome').setDescription('Sends Welcome message'),
    async execute(interaction){
        await interaction.reply(`Welcome ${interaction.user}!`)
    }
}