const {SlashCommandBuilder, MessageFlags}= require('discord.js');

module.exports= {data: new SlashCommandBuilder().setName('timeout').setDescription('Timeouts the user')
    .addUserOption(option=> option.setName('user').setDescription('Specify the user to be timed out').setRequired(true))
    .addStringOption(reason=> reason.setName('reason').setDescription('Specify the reaon for timing out the specific user'))
    .addNumberOption(duration=> duration.setName('duration').setDescription('Specify the duration of timemout')),
    async execute(interaction){
        const reason=interaction.options.getString('reason')
        const member=interaction.options.getMember('user')
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

        try{
            const duration = interaction.options.getNumber('duration') ?? 5;
            await member.timeout(duration*60*1000,reason)
            await interaction.reply('User has been timed out')
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Failed to ban user.', ephemeral: true });
        }
    }
}