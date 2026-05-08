const {SlashCommandBuilder, MessageFlags}=require('discord.js');

module.exports= {data: new SlashCommandBuilder().setName('kick').setDescription('Kicks a user from the server')
    .addUserOption(option => 
        option.setName('user').setDescription('User you want to kick').setRequired(true))
    .addStringOption(reason=> 
        reason.setName('reason').setDescription('Give reason for kicking the user').setRequired(true)
    ),
            async execute(interaction) {
                const member=interaction.options.getMember('user');
                if (member==null){
                                    return interaction.followUp({
                                        content: 'member should not be null',
                                        flags: MessageFlags.Ephemeral, //only shown to specific user
                                    });
                                
                    }
                    else if (member.id==interaction.user.id){
                        return interaction.followUp({
                            content:'You cant kick yourself',
                            flags:MessageFlags.Ephemeral,
                        })
                    }
                try{
                await member.kick();
                await interaction.reply('User has been kicked');
                }
                catch (error) {
                    console.error(error); 
                    if (interaction.replied || interaction.deferred) { // if the the bot has already drafted a message and hit error, or it took much time 
                        await interaction.followUp({
                            content: 'There was an error while executing this command!',
                            flags: MessageFlags.Ephemeral, //only shown to specific user
                        });
                    } else {
                        await interaction.reply({
                            content: 'There was an error while executing this command!',
                            flags: MessageFlags.Ephemeral,
                        });
                    }
                }
    }
}