const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const stat=require("../models/stat.js");
const fs= require("fs");
var moment = require('moment');
moment().format();
module.exports.run = async (bot,message,args) =>{
    let week = moment().isoWeek();
                        stat.find({
                          }, async (err,stats)=>{
                              if(stats)
                              {
                                  let embed = new Discord.RichEmbed().setTitle(`Топ по колчеству Акров:`)
                                  let list="";
                                  let len = stats.length<15 ? stats.length : 15;
                              console.log(len)
                                  for(let i=0;i<len;i++)
                                  {
                                    let cnt = i+1;
                                    let pointz=round(stats[i].akr,2)
                                    let member = message.guild.members.find(x => x.id === stats[i].id_member);
                                    list=list+cnt+`.  `+member+`  -  `+pointz+`  ${decOfNum(Math.floor(stats[i].akr), ['Акр','Акра','Акров'])}.\n\n`
                                  }
                                  embed.setDescription(list)
                                  message.channel.send(embed).then(msg => msg.delete(10000));;
                              }
                            
                            //let member = message.guild.members.find(x => x.id === id);
                         //   member.user.send(`Вы получили ${give} Points за мероприятие: "${activitys.Name}"`)
                              // standartch.send(`${args[it]} получил ${give} Points за мероприятие: "${activitys.Name}"`);
                      }).sort( { akr: -1 } )
                      function round(value, decimals) {
                        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
                    }
                    function decOfNum(number, titles)
        {
            let decCache= [],
                  decCases = [2, 0, 1, 1, 1, 2];
            if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }
        
}
module.exports.help = {
    name: "topakr"
}