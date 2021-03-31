const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot,message,args) =>{
    let alfabit= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
    let mess = ''
    let num = Number(args[0])
    for(let i=3;i>=0;i--)
    {
        let Pow = Math.pow(36,i)
        let flor = Math.floor(num/Pow)
        mess += alfabit[flor]
        num -= flor*Pow
    }
                message.channel.send(mess);
}
            
module.exports.help = {
    name: "g"
}