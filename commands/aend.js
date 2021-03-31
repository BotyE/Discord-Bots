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
            activity.findOne({
                id: message.author.id,
                timeend: 1
              }, async (err,activitys)=>{
            
                if(err) console.log(err);
                if(!activitys)
                { return message.author.send("У вас не запущено мероприятие");}
                else 
                {
                    activity_game.findOne({
                        id_manager: message.author.id,
                        timeend: 1
                      }, async (err,activity_games)=>{
                        if(!activity_games)
                        { return message.author.send("У вас не запущена игра");}
                    let min = (Date.now() - activity_games.timestart)/3600000;
                    let gives = activity_games.members.length*min;
                    let standartch = message.guild.channels.find(x => x.id === `652837611215519779`);
                    let numb;
                    activity_games.timeend=Date.now();
            if(args[0].toLowerCase().indexOf('team')!=-1)
            {
                
                numb=Number(args[0][4]);
                give=round(gives/numb,2);
    
                for(let i=0; i<numb;i++)
                    {
                        let it = i+1;
                        let end = args[it].length
                        let id = args[it].substring(3,end-1)
                        point.findOne({
                            id: id,
                            week: week
                          }, async (err,points)=>{
                              if(!points)
                              {
                                const Newpoints = new point({
                                    id: id,
                                    week: week,
                                    points: give,
                                    games: 1
                                  })
                                  Newpoints.save();
                              }
                              else
                              {
                                  points.points=points.points+give
                                  points.games=points.games+1
                                  points.save()
                              }
                            
                            let member = message.guild.members.find(x => x.id === id);
                            member.user.send(`Вы получили ${give} Points за мероприятие: "${activitys.Name}"`)
                               standartch.send(`${args[it]} получил ${give} Points за мероприятие: "${activitys.Name}"`);
                            })
                    }
            }
            if(args[0].toLowerCase().indexOf('top')!=-1)
            {
                numb=Number(args[0][3]);
                give = gives/((numb*(numb+1)/2))
                for(let i=0; i<numb;i++)
                    {
                        let giv = round(give*(numb-i),2);
                        let it = i+1;
                        let end = args[it].length
                        let id = args[it].substring(3,end-1)
                        point.findOne({
                            id: id,
                            week: week
                          }, async (err,points)=>{
                              if(!points)
                              {
                                const Newpoints = new point({
                                    id: id,
                                    week: week,
                                    points: giv,
                                    games: 1
                                  })
                                  Newpoints.save();
                              }
                              else
                              {
                                  points.points=points.points+giv
                                  points.games=points.games+1
                                  points.save()
                              }
                            
                            let member = message.guild.members.find(x => x.id === id);
                            member.user.send(`Вы получили ${giv} Points за мероприятие: "${activitys.Name}"`)
                        standartch.send(`${args[it]} получил ${giv} Points за мероприятие: "${activitys.Name}"`);
                            })
                    }
            }
            function roundnum(num){
                return Math.floor(num / 10)*10;
                }
                function round(value, decimals) {
                    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
                }
                activity_games.save()
                })
              }
            })
        
}
module.exports.help = {
    name: "aend"
}