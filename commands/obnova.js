const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
    message.author.send(`Спасибо за отзыв.`)
    let private = bot.channels.find(x => x.id === "652837473503805440");
    let embed = new Discord.RichEmbed().setTitle(`Обнова.`).setDescription(`${message.author} \nКомметарий - ${args}`)
    private.send(embed)
}
module.exports.help = {
    name: "obnova"
}