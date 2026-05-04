const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.on(Events.InteractionCreate, async (interaction)=> {
  if (!interaction.isChatInputCommand) return; // checks if user accessed a slash command or not
  const command = interaction.client.commands.get(interaction.commandName); // accesse the command that the suer specified
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);//if no command was found, it is to be taken care of
		return;
	}
	try {
		await command.execute(interaction); //executes the command
	} catch (error) { // error block
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
})

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});


client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //builds a path from current folder to the folder that contains all my commands
const commandFolders = fs.readdirSync(foldersPath); //reads all the subfolders inside for example ['utility','moderation','fun']

for (const folder of commandFolders) {//loops through each folder present in commands
	const commandsPath = path.join(foldersPath, folder); //builds a path from current folder to the main project folder
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js')); //now it reads fils present in the folder, and all the files ending with '.js' is stored inside an array
	for (const file of commandFiles) { // the inner loop goes through each file in the array
		const filePath = path.join(commandsPath, file); // builds a path such as file->commandFolder->totalCommands->MainProjectFolder
		const command = require(filePath); // extracts the command
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(process.env.DISCORD_TOKEN);