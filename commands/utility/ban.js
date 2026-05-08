const {Client, SlashCommandBuilder, MessageFlags, GuildMember}= require('discord.js')
require('dotenv').config()

module.exports={data: new SlashCommandBuilder().setName('ban').setDescription('Bans a user')
    .addUserOption(
        (options)=> options.setName('user').setDescription('User to be banned')
    ),
    async execute(interaction){
        const member=interaction.options.getMember('user');
        if (!member){
            return interaction.followUp({
                content: 'Member doesnt exist',
                flags: MessageFlags.Ephemeral
            })
        }
        else if (member.id===interaction.user.id){
            return interaction.followUp({
                content: 'Cannot ban yourself',
                flags: MessageFlags.Ephemeral
            })

        }

        try {
            await member.ban()
            await interaction.reply('User has been banned')
        }
        catch (error){
            console.log(error);

        }
        
    }
}