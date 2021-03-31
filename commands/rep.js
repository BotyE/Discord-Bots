const Discord = require("discord.js");
const fs= require("fs");
var moment = require('moment');
moment().format();
const rep=require("../models/rep.js");
const week=require("../models/week.js");
const stat=require("../models/stat.js");
module.exports.run = async (bot,message,args) =>{
    let User = message.mentions.users.first();
    if(!User) message.author.send("Вы не упомянули пользователя")
    console.log(message.author.username +'->'+User.username)
    if(User.id === message.author.id)
    message.author.send("Нельзя выдать +rep")
    rep.findOne({
        id: message.author.id,
        week: moment().isoWeek(),
        year: moment().year(),
        rep_id: User.id
      }, (err,reps)=>{
            if(!reps)
            {
                const repsnew = new rep({ 
                id: message.author.id,
                week: moment().isoWeek(),
                year: moment().year(),
                rep_id: User.id
                })
                repsnew.save()
                week.findOne({
                    id: User.id,
                    week: moment().isoWeek(),
                    year: moment().year()
                }, (err,weeks) => {
                    if(!weeks)
                    {
                      const NewStats = new week({
                        id: User.id,
                week: moment().isoWeek(),
                year: moment().year(),
                rating: 1,
                time_in_voice: 0,
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
                        weeks.reputation_count+=1
                        weeks.rating+=1
                        User.send(`${message.author} респектнул вам.`)
                        weeks.save()
                    }
                    stat.findOne({
                        id: User.id
                    }, (err,stats) => {
                        if(!stats)
      {
        const NewStats = new stat({
          id: User.id,
  time_in_voice: 0,
  messages_count: 0,
  joinDate: 0,
  id_member: User.id,
  rating: 1,
  rep: 1,
  akr: 0,
  gectar: 0,
  lvl: 0,
  points: 0,
  need_points: 500,
  rub: 0,
  chat_mute: 0,
  voice_mute: 0,
  verebal_warns: 0,
  writen_warns: 0,
  bans: 0,
  connect_time: 0,
  disconnect_time: 0
        })
  
        NewStats.save();
      }
      else{
                        stats.rating+=1
                        stats.rep+=1
                        stats.save()
      }
                    })
                })
            }
            else{
                return message.author.send(`Вы уже респектнули этому человеку на этой неделе.`)
            }

      })
}
            
module.exports.help = {
    name: "rep"
}