const { SlashCommandBuilder, MessageFlags}= require('discord.js')
require('dotenv').config()

module.exports={data: new SlashCommandBuilder().setName('ban').setDescription('Bans a user')
    .addUserOption(
        (options)=> options.setName('user').setDescription('User to be banned'))
    .addStringOption(
        (reason)=> reason.setName('reason').setDescription('Reason for ban')
    ),
    
    async execute(interaction){
        const reason= interaction.options.getString('reason') ?? 'no reason provided'
        const member=interaction.options.getMember('user');
        if (!member){
            return interaction.reply({
                content: 'Member doesnt exist',
                flags: MessageFlags.Ephemeral
            })
        }
        else if (member.id===interaction.user.id){
            return interaction.reply({
                content: 'Cannot ban yourself',
                flags: MessageFlags.Ephemeral
            })

        }

        try {
            await member.ban({reason, deleteMessageSeconds: 60 * 60 * 24 * 7 })
            await interaction.reply('User has been banned');
        }
        catch (error){
            console.log(error);
            await interaction.reply({ content: 'Failed to ban user.', ephemeral: true });

        }
        
    }
}