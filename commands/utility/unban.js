const {SlashCommandBuilder, MessageFlags}= require('discord.js');
require('dotenv').config()

module.exports= {data: new SlashCommandBuilder().setName('unban').setDescription('unbans a user')
    .addUserOption(option=> option.setName('user').setDescription('Specify the user to be unbanned').setRequired(true)),
    async execute(interaction){

        try{
            const member=interaction.options.getUser('user').id
            await interaction.guild.members.unban(`${member}`)
            await interaction.reply('User has been unbanned')
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Failed to unban user.', ephemeral: true });
        }
    }
}