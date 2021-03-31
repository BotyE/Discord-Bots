const Discord = require("discord.js");
var moment = require('moment');
const awarn=require("../models/awarn.js");
moment().format();

module.exports.run = async (bot,message,args) =>{
    if(!message.member.roles.some(r=> ['619257570573549588','619257571429056514','619257574197428283'].includes(r.id) || message.author.id=== `226767223941758976`)) return;
    try {
      let Userboy = message.mentions.users.first();
      let boy = await message.guild.fetchMember(Userboy);
      if(!Userboy) return console.log(Userboy.id);
      let warnreason = args.join(" ").slice(22);
      awarn.findOne({
        id: Userboy.id
      }, (err,awarns)=>{
        if(!awarns)
        {
            let newembed = new Discord.RichEmbed().setDescription(`У ${args[0]} не было предупреждений.`)
            message.channel.send(newembed).then(msg => msg.delete(10000));
        }
        else 
        {
            let str3=""
            for(let i=awarns.log.length-1;i>=0;i--)
            {
                
                  str3 += `<@${awarns.log[i].from}> ${awarns.log[i].type} предупреждение по причине: ${awarns.log[i].reason}. 
Дата: ${time(awarns.log[i].time)}\n\n`
            }
            let newembed = new Discord.RichEmbed().setTitle(`Лог предупреждений у ${Userboy.username}`).setDescription(str3)
            message.channel.send(newembed).then(msg => msg.delete(10000));
        }
        })
      } catch (err) {
  
        console.log(err);
      
      }
      function time(data) {
        var time = new Date(data);
        let month = [`Января`,`Февраля`,`Марта`,`Апреля`,`Мая`,`Июня`,`Июля`,`Августа`,`Сентября`,`Октября`,`Ноября`,`Декабря`];
        let month1 = time.getMonth();
        let day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var sec = time.getSeconds();
        var temp = time.getFullYear()+" "+day +` `+month[month1] +' '+ ((hour == 0) ? "00:" : `${hour}:`);
        if(minute==0)
            temp+="00:"
        else
            temp += ((minute < 10) ? '0' : '')+minute+":"
        if(sec==0)
         temp +="00"
        else 
            temp += ((sec < 10) ? '0' : "")+sec
        return temp;
      }
      }
  module.exports.help = {
      name: `awl`
  }