const Discord = require("discord.js");
var moment = require('moment');
moment().format();

module.exports.run = async (bot,message,args) =>{
  
        console.log(moment().isoWeek())
        let end = args[0].length
                        let id = args[0].substring(3,end-1)
                        let standartch = message.guild.members.find(x => x.id === id);
                        console.log(standartch)
}
module.exports.help = {
    name: "week"
}