const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
            const role = message.guild.roles.find(role => role.name.toLowerCase() === args.join(" ").toLowerCase())
            if (!role) return message.reply('Нет такой роли.');
            let membersWithRole = message.guild.roles.get(role.id).members;
            let mem = ``;
           for (let i = 0; i < membersWithRole.size; i++) 
                    mem = mem +membersWithRole.array()[i]+`\n`;
                let embed = new Discord.RichEmbed().setDescription(mem).setTitle(role.name);
                message.channel.send(embed);
}
            
module.exports.help = {
    name: "role"
}