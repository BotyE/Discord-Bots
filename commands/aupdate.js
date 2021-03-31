const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const activity=require("../models/activity.js");
  const count=require("../models/count.js");
  const activity_game=require("../models/activity_game.js");
const fs= require("fs");
let ivent = require("../json/1.json");

module.exports.run = async (bot,message,args) =>{
 
  activity.findOne({
    id: message.author.id,
    timeend: 1
  }, async (err,activitys)=>{

    if(err) console.log(err);
    if(!activitys)
    { return message.author.send("У вас не запущено мероприятие!");}
    else 
    {
      activity_game.findOne({
        id_manager: message.author.id,
        timeend: 1
      }, async (err,activity_games)=>{
        if(activity_games)
        { 
      let members=[]
      
        for(let i=0;i<activitys.channels_id.length;i++)
        {
            let channels = await message.guild.channels.find(x => x.id === activitys.channels_id[i]);
            console.log(channels)
            if(channels.type==="voice")
                  for(let j=0;j<channels.members.array().length;j++)
                    if(channels.members.array()[j].displayName!='spec' && channels.members.array()[j].displayName!='спек')
                      members.push(channels.members.array()[j].id)
        }
        activity_games.members=members;
        activity_games.save()
        
        
    }
        activitys.save();
      
    })
  }
})
}
module.exports.help = {
    name: "aupdate"
}