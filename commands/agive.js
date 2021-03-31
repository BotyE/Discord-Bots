const Discord = require("discord.js");
const fs= require("fs");
const stat=require("../models/stat.js");
module.exports.run = async (bot,message,args) =>{
    let User = message.mentions.users.first();
    if(!User) return message.author.send("Вы не упомянули пользователя")
    console.log(message.author.username +'->'+User.username)
    if(User.id === message.author.id)
        return message.author.send("Нельзя передать себе.")
    stat.findOne({
        id: message.author.id
      }, (err,stats)=>{
        if(Number(args[1])<=0 || stats.akr<Number(args[1]))
        { 
            return message.author.send(`Вы не можете перевести такую сумму.`)
        }
            stats.akr-=Number(args[1])
            stat.findOne({
                id: User.id
              }, (err,statss)=>{
                if(!statss)
                {
                  const NewStats = new stat({
                    id: User.id,
            time_in_voice: 0,
            messages_count: 0,
            joinDate: 0,
            id_member: User.id,
            rating: 0,
            rep: 0,
            akr: Number(args[1]),
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
                else
                {
                  statss.akr+=Number(args[1])
                  statss.save()
                }
              })
            stats.save()
            message.author.send(`Вы успешно перевели ${Number(args[1])} ${decOfNum(Number(args[1]), ['Акр','Акра','Акров'])} пользователю ${User}.`)
            User.send(`Пользователь ${message.author} перевел вам ${Number(args[1])} ${decOfNum(Number(args[1]), ['Акр','Акра','Акров'])}.`)
        })

        function decOfNum(number, titles)
        {
            let decCache= [],
                  decCases = [2, 0, 1, 1, 1, 2];
            if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }
}
module.exports.help = {
    name: "agive"
}