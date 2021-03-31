const Discord = require("discord.js");
const fs= require("fs");
const stat=require("../models/stat.js");
const inventory=require("../models/inventory.js");
module.exports.run = async (bot,message,args) =>{
    if(!args[0]) return;
    if(!args[1]) return;
    if(!Number.isInteger(args[1])) return
    switch(args[0])
    {
        case 'room':
            if(!args[2]) return;
            if(!Number.isInteger(args[2])) return
            stat.findOne({
                member_id: message.author.id
              }, (err,stats)=>
              {
                  if(stats.akr<150*(4 - Number(args[1]))*Number(args[2]))
            inventory.findOne({
                id: message.author.id
              }, (err,inventorys)=>
              {
                for(let i=0;i<inventorys.lenght;i++)    
                {}
              })
            })
                message.channel.send(`Из кейса ${args[0]} вы получили комнату уровня ${name[0]} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
        case 'start'||'lite'|| 'gold' || 'iron'||'medium'||'platinum'||'diamond'||'wolfram'||'premium'||'vital' || 'lord' || 'benefactor' || 'sponsor':
                message.channel.send(`Из кейса ${args[0]} вы получили роль VIP ${name} сроком на ${min} ${decOfNum(min,['День','Дня','Дней'])}. Чтобы активировать, напишите !activate`)
                break;
        case 'case':
                message.channel.send(`Из кейса ${args[0]} вы получили кейс ${name} в количестве ${min}. Чтобы открыть кейс напишите команду !open lite|gold|perfect|ruby`)
                break;
    }
}
module.exports.help = {
    name: "buy"
}