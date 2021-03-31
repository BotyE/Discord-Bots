const Discord = require("discord.js");
const fs= require("fs");
const stat=require("../models/stat.js");
var moment = require('moment');
moment().format();
module.exports.run = async (bot,message,args) =>{
    stat.findOne({
        id_member: message.author.id
      }, async (err,stats)=>{
    if(stats.birth[0]===0)
    {
    const filter = m => m.author.id===message.author.id;
    let channels = await message.author.send(`У вас есть минута, чтобы прислать вашу дату рождения.
Формат даты: ДД.ММ.ГГГГ`)
    channels.channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] })
      .then(async collected => {
        let day = Number(collected.array()[0].content[0])*10+Number(collected.array()[0].content[1])
        let mounth = Number(collected.array()[0].content[3])*10+Number(collected.array()[0].content[4])
        let year = Number(collected.array()[0].content[6])*1000+Number(collected.array()[0].content[7])*100 + Number(collected.array()[0].content[8])*10+Number(collected.array()[0].content[9])
        console.log(collected.array()[0].content)
        let mounths = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
        let days = [31,28,31,30,31,30,31,31,30,31,30,31]
        if(year%4===0 && mounth===2)
        {
            days[1]+=1
        } 
        console.log(1111)
        if(year < moment().year()-10 && year >= 1950 && mounth <=12 && mounth >=1 && day >=1 && day <=days[mounth-1])
        {
            message.author.send(`Вы установили дату своего рождения: ${day} ${mounths[mounth-1]}`)
            console.log(collected.array()[0].content)
            stats.birth= [day,mounth,year]
            stats.save()
        }
        else return message.author.send("Вы не можете установить такую дату рождения")

        message.author.send(day+' ' + mounth)
       console.log(collected.array()[0].content)
      })
      .catch(collected => console.log(1));
    }
    else message.author.send("Вы уже установили дату рождения!")
})
    }

    
            
module.exports.help = {
    name: "birth"
}