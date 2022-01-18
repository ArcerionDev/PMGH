const { MessageEmbed } = require("discord.js")


module.exports = {

    name: "ping",
    desc: "Pong!",
    aliases: ['ping'],
    categories: [0],
    execute: function (client, message, args, prefix) {
        message.reply({embeds: [new MessageEmbed().setTitle('Pong!').setDescription(`Latency is ${'`'}${client.ws.ping}${'`'} ms`)]})
    }
}