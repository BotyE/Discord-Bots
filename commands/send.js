const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
    if(message.member.id == '226767223941758976')
        {
            let embs = JSON.parse(args.join(" ").slice(0));
            message.channel.send({
                embed: embs
            })
        }
}
module.exports.help = {
    name: "send"
}