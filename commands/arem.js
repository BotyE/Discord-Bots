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
        let standartch = message.guild.channels.find(`id`,`702793082889961522`);
        if(!warnreason)
        {
          let awarnsEmbed = new Discord.RichEmbed()
          .setDescription(`<@${message.author.id}>, вы не указали причину.`)
          .setColor(3553599)
          standartch.send(awarnsEmbed);
          return;
        }
        if(!awarns)
      {
          
        let awarnsEmbed = new Discord.RichEmbed()
        .setDescription(`У человека нет предупреждений.`)
        .setColor(3553599)
        message.author.send(awarnsEmbed);
        return;
      }
      if(awarns.Count<=0)
      {
        let awarnsEmbed = new Discord.RichEmbed()
        .setDescription(`У человека нет предупреждений.`)
        .setColor(3553599)
        message.author.send(awarnsEmbed);
        return;
      }
        if(err) console.log(err);
        awarns.log.push({
            from: message.author.id,
            type: "Снял",
            time: Date.now(),
            reason: warnreason
          })
        let awarnsEmbed = new Discord.RichEmbed()
        .setDescription(`${message.author} снял предупреждение ${awarns.Count}/4 с ${args[0]} по причине: ${warnreason}`)
        .setColor(3553599)
        standartch.send(awarnsEmbed);
        Userboy.send(awarnsEmbed);
        if(awarns.Count>=4)
        {
              let Role = message.guild.roles.find(`id`, "668781900185206826");
              console.log(Role);
              boy.removeRole(Role.id);
          
              let awarnsEmbed = new Discord.RichEmbed()
              .setDescription(`Роль <@&668781900185206826> была снята.`)
              .setColor(3553599)
              standartch.send(awarnsEmbed);
        }
        awarns.Count = awarns.Count-1;
        awarns.save();
        });
      } catch (err) {
  
        console.log(err);
      
      }
      }
  module.exports.help = {
      name: `arem`
  }