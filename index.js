const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
client.commands = new Discord.Collection();
const config = require('./config.json')
const fs = require('fs')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
}

client.on('ready', () => {
    console.log ('Bot is running!');
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('dnd');
    client.user.setActivity('Elementary is currently in Development | ' + prefix, {type: 'WATCHING'});
})

client.on('message', message => {
    if (message.content.startsWith(prefix + 'pong')) {
        message.channel.send('ping');
    }
    if (message.content.startsWith(prefix + 'dab')) {
      message.author.sendMessage("<o/");
    }
//Anti Swear
    var badwords = ["fuck", "bitch", "pussy", "dick", "penis", "anal", "vagina", "nigga", "nigger", "shit"];
    if (message.content.includes("fuck", "bitch", "pussy", "dick", "penis", "anal", "vagina", "nigga", "nigger", "shit")) { 
      message.delete();
      message.author.sendMessage(message.author.tag + " Hey! Don't Swear!");
      message.reply("You're not allowed to use that word on, " + message.guild);
    }
//eval

if (message.content.startsWith(prefix + "eval")) {
  var SkyAdmins = [249474587530625034, 261418273009041408];
  if(SkyAdmins.includes(message.author.id)) return;
    try {
      const code = message.content.slice(6);
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }






    function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}    
})



client.login(config.token);