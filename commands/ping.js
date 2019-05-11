const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'send a pong',
    async execute(message, args) {
        message.channel.send('pong');
    },
}