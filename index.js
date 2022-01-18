const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, DiscordAPIError, Message, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands/')
for (const folder of commandFolders) {

    if (!folder.endsWith('.js')) {

        let commandFiles = fs.readdirSync(`./commands/${folder}/`);

        for (let command of commandFiles) {

            command = require(`./commands/${folder}/${command}`)

            client.commands.set(command.name, command)

        }

    }

}

module.exports.commands = client.commands

const prefix = require('./config.json').prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${prefix}help`, 'PLAYING')
})

client.on('message', async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        let args = message.content.split(' ')
        let command;
        Array.from(client.commands).forEach(c => {
            if (c[1].aliases.includes(args[0].slice(1))) {
                command = c[1]
            }
        })
        if (!command) return;
        command.execute(client, message, args, prefix)

})

client.login(require('./config.json').token)

process.on('uncaughtException', e => {
    console.log(e)
})