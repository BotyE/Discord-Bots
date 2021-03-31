const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const activity=require("../models/activity.js");
  const count=require("../models/count.js");
  const activity_game=require("../models/activity_game.js");
const fs= require("fs");
let ivent = require("../json/1.json");

module.exports.run = async (bot,message,args) =>{
  activity_game.findOne({
    id_manager: message.author.id,
    timeend: 1
  }, async (err,activity_games)=>{
    if(activity_games)
    { return message.author.send("У вас запущена игра, вы не можете удалить мероприятие!");}
            activity.findOne({
                id: message.author.id,
                timeend: 1
              }, async (err,activitys)=>{
            
                if(err) console.log(err);
                if(!activitys)
                { return message.author.send("У вас не запущено мероприятие!");}
                else 
                {
                    let mess1 = await message.guild.channels.find(x => x.id === "652887453526392867");
                    let delmess = await mess1.fetchMessage(activitys.mess);
                    delmess.delete();
                    for(let i=0;i<activitys.channels_id.length;i++)
                    {
                        let channels = await message.guild.channels.find(x => x.id === activitys.channels_id[i]);
                                  channels.delete();
                    }
                    activitys.timeend=Date.now();
                    if(activitys.games===0)
                      activitys.delete()
                    else
                    activitys.save();
                }
              })
            })
        
}
module.exports.help = {
    name: "adel"
}