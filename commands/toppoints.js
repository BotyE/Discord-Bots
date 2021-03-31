const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const activity=require("../models/activity.js");
  const count=require("../models/count.js");
  const point=require("../models/point.js");
  const activity_game=require("../models/activity_game.js");
const fs= require("fs");
let ivent = require("../json/1.json");
var moment = require('moment');
moment().format();
module.exports.run = async (bot,message,args) =>{
    let week = moment().isoWeek();
                        point.find({
                            week: week
                          }, async (err,points)=>{
                              if(points)
                              {
                                  let embed = new Discord.RichEmbed().setTitle(`Топ по колчеству Points за эту наделю:`)
                                  let list="";
                                  let len = points.length<15 ? points.length : 15;
                              console.log(len)
                                  for(let i=0;i<len;i++)
                                  {
                                    let cnt = i+1;
                                    let pointz=round(points[i].points,2)
                                    let member = message.guild.members.find(x => x.id === points[i].id);
                                    list=list+cnt+`.  `+member+`  -  `+pointz+`  Points.\n\n`
                                  }
                                  embed.setDescription(list)
                                  message.channel.send(embed);
                              }
                            
                            //let member = message.guild.members.find(x => x.id === id);
                         //   member.user.send(`Вы получили ${give} Points за мероприятие: "${activitys.Name}"`)
                              // standartch.send(`${args[it]} получил ${give} Points за мероприятие: "${activitys.Name}"`);
                      }).sort( { points: -1 } )
                      function round(value, decimals) {
                        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
                    }
        
}
module.exports.help = {
    name: "toppoints"
}