const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    description: '[Developer] Evaluate',
    async execute(message, args) {
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
            
    },
}