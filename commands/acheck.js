const Discord = require("discord.js");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const active=require("../models/active.js");
const count=require("../models/count.js");
var moment = require('moment');
moment().format();

module.exports.run = async (bot,message,args) =>{
    await  active.find({
        active: true
      }, async(err,actives)=>{
          let str = "⠀"
          for(let i=0;i<5;i++)
          {
              let str1 = actives[i].activityname.split(" ");
              let str2 =str1.length
              str1 = str1.join("⠀")
              let len = str.repeat(Math.floor((32-actives[i].activityname.length+str2)/2))
    let im = {
        "color": 3553599,
        "title":`${len}__\`PLACE⠀|⠀${str1}\`__`,
        "description":`\n\n**[Нажать для участия](https://discordapp.com/channels/617776960097091783/652887453526392867)**⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀[Полные правила](${actives[i].activityrule})`,
/*
Краткое описание мероприятия:\n
${actives[i].name}`,*/
       /* "fields":[
              {
            "name":`${actives[i].name}`,
            "value":`Приз зависит от времени. Минимум 5 акров.`,
            "inline":true
              }
            ],*/
            "image": {
              "url": `${actives[i].picture}`
            }/*,
        "footer":{
          "text":`Создал мероприятие - ${message.author.tag}`,
          "icon_url":`${message.author.displayAvatarURL}`
            }*/
          }
console.log(actives[i].picture)
 message.channel.send({
        embed: im
    })
}
})
}
module.exports.help = {
    name: "acheck"
}