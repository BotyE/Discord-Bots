const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const stat=require("../models/stat.js");
  const week=require("../models/week.js");
const fs= require("fs");
var moment = require('moment');
moment().format();
module.exports.run = async (bot,message,args) =>{
    let weeka = moment().isoWeek();
    if(args[0]==='voice')
    {
                        week.find({
                            week: weeka
                          }, async (err,weeks)=>{
                              if(weeks)
                              {
                                  let embed = new Discord.RichEmbed().setTitle(`Топ по времени в Голосовых каналах за неделю:`)
                                  let list="";
                                  let len = weeks.length<15 ? weeks.length : 15;
                              console.log(len)
                                  for(let i=0;i<len;i++)
                                  {
                                      if(weeks[i].time_in_voice>=1000)
                                    {
                                        stat.findOne({
                                            id: weeks[i].id
                                          }, (err,stats)=>{
                                            let datenow = Date.now();
                                            if(stats)
                                                {
                                                    if(stats.connect_time>stats.disconnect_time)
                                            {
                                                if(message.member.voiceChannel && message.member.voiceChannel.id!='650781856219791374')
                                                {
                                            let gettime=(datenow - stats.connect_time);
                                            stats.connect_time=datenow
                                            stats.points+=gettime/4000
                                            stats.akr+=round(gettime/60000,1)
                                            console.log(moment().year())
                                            stats.time_in_voice+=gettime;
                                            week.findOne({
                                                id: message.author.id,
                                                week: moment().isoWeek(),
                                                year: moment().year()
                                              }, (err,weekss)=>{
                                            
                                                if(err) console.log(err);
                                                if(!weekss)
                                                {
                                                  const NewStats = new week({
                                                    id: weeks[i].id,
                                            week: moment().isoWeek(),
                                            year: moment().year(),
                                            rating: 0,
                                            time_in_voice: gettime,
                                            message_count: 0,
                                            activity_wins: 0,
                                            activity_count: 0,
                                            reputation_count: 0,
                                            donate: 0,
                                            bonus: 0
                                                  })
                                            
                                                  NewStats.save();
                                                }
                                                else
                                                {
                                                  weekss.time_in_voice+=gettime;
                                                  weekss.save();
                                                }
                                              });
                                            }
                                            else stats.connect_time=datenow
                                            }
                                        }
                                        while(stats.points>=stats.need_points)
                                            {
                                                console.log(stats.points)
                                                stats.akr+=stats.need_points/4
                                                stats.lvl+=1;
                                                stats.points-=stats.need_points
                                                stats.need_points+=100*stats.lvl+500
                                                
                                            }
                                            stats.save()
                                        })
                                    let cnt = i+1;
                                    let member = message.guild.members.find(x => x.id === weeks[i].id);
                                    list=list+cnt+`.  `+member+`  -  ${time(weeks[i].time_in_voice)}\n\n`
                                    }
                                  }
                                  embed.setDescription(list)
                                  message.channel.send(embed).then(msg => msg.delete(10000));
                              }
                            
                            //let member = message.guild.members.find(x => x.id === id);
                         //   member.user.send(`Вы получили ${give} Points за мероприятие: "${activitys.Name}"`)
                              // standartch.send(`${args[it]} получил ${give} Points за мероприятие: "${activitys.Name}"`);
                      }).sort( { time_in_voice: -1 } )
                    }
                      function round(value, decimals) {
                        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
                    }
                    function time(data) {
                        var time = Number(data);
                        var hour = Math.floor((time / (1000 * 60 * 60)));
                        var minute = Math.floor(((time / (1000 * 60))-hour*60));
                        var second = Math.floor(((time / 1000)-hour*3600-minute*60));
                        
                        var temp = ``
                        if(hour != 0)
                            temp += hour + decOfNum(hour, [' час ', ' часа ', ' часов '])
                        if(minute !=0)
                                temp += minute+ decOfNum(minute, [' минута ', ' минуты ', ' минут '])
                        if(second != 0)
                            temp += second + decOfNum(second, [' секунда', ' секунды ', ' секунд '])
                        if(temp.length<1)
                            temp+=` `
                            return temp;
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
    name: "topweek"
}