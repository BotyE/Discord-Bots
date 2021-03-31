const Discord = require("discord.js");
const fs= require("fs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const active=require("../models/active.js");
const count=require("../models/count.js");
module.exports.run = async (bot,message,args) =>{
    if(args[0]==="add")
    {
        let embed1= new Discord.RichEmbed().setTitle(`Введите название мероприятия:`)
    let mes = await message.author.send(embed1)
    let it=0;
    let activityname,activityrule,name,picture,voice,limit;
    let quest =[]
    let ans =''
    let str
    console.log(1)
        const collector = mes.channel.createMessageCollector(m => m.author.id===message.author.id, {time: 600000})
   let now;
        collector.on('collect', async msg => {
          console.log(msg)
            switch(it) {
              case 0:
                  activityname = msg.content;
                  embed1.setTitle('Пришлите ссылку на правила:')
                  message.author.send(embed1)
                  it+=1;
                  break;
              case 1:
                  activityrule = msg.content;
                  embed1.setTitle('Перепишите тип выигрыша:').setDescription(`Призы получает команда победителей.
Призы получает тройка победителей.
Приз получает один победивший игрок.
Или же напишите собственный тип выигрыша по типу: Приз(ы) получает [количество] победивший(их) игрок(ов).`)
                  message.author.send(embed1)
                  it+=1;
                  break;
            case 2:
                  name=msg.content;
                  embed1.setTitle('Пришлите ссылку на картинку:').setDescription("")
                  message.author.send(embed1)
                  it+=1;
                  break;
            case 3:
                  picture=msg.content;
                  embed1.setTitle('Пришлите через пробел количество голосовых каналов и количество участников по стандарту:').setDescription("")
                  message.author.send(embed1)
                  it+=1;
                  break;
              case 4:
                  let arg = msg.content.split(" ");
                  voice=Number(arg[0])
                  limit= Number(arg[1])
                  let im = {
                    "color": 3553599,
                    "title":`PLACE | ${activityname}`,
                    "description":`\n\n[Полные правила](${activityrule})\n[Участвовать в мероприятии]()`,
                    "fields":[
                          {
                        "name":`${name}`,
                        "value":`Приз зависит от времени. Минимум 5 акров.`,
                        "inline":true
                          }
                        ],
                        "image": {
                            "url": picture
                          },
                    "footer":{
                      "text":`Создал мероприятие - ${message.author.tag}`,
                      "icon_url":`${message.author.displayAvatarURL}`
                        }
                      }
                      message.author.send({
                    embed: im
                })
                  let embed2= new Discord.RichEmbed().setTitle(`Если вы хотите добавить это мероприятие, напишите yes`)
                  message.author.send(embed2)
                  it+=1
                  break;
              case 5:
                  if(msg.content='yes')
                    {
                        active.findOne({
                            activityname: activityname
                          }, (err,actives)=>{
                              if(!actives)
                              {
                                const NewActives = new active({
                                    activityname: activityname,
                                    active: true,
                                    activityrule: activityrule,
                                    name: name,
                                    picture: picture,
                                    voice: voice,
                                    limit: limit
                                  })
                                NewActives.save()
                                message.author.send(`Вы успешно добавили мерприятие ${activityname}.`)
                              }
                              else{
                                  message.author.send(`Такое мероприятие уже добавлено.
Добавление мероприятия отменено.`)
                              }
                            })
                    }
                    else message.author.send('Вы отменили создание мероприятия.')
                  collector.stop();
                  break;
            }
        })
    }
    if(args[0]==='on')
    {
      let str2=''
      await  active.find({
          active: false
        }, async(err,actives)=>{
          if(err) console.log(err);
          if(actives.length===0)
          {
              message.author.send('Сейчас нет отключенных мероприятий.')
          }
          else {
              for(i=0;i<actives.length;i++)
              {
                  str2 += `**${i+1}.** ${actives[i].activityname}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к включению мероприятия:`).setDescription(str2)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите включить мероприятие, напишите номер мероприятия.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= actives.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  actives[i-1].active=true;
                  actives[i-1].save();
                  embed.setTitle(`Вы включили мероприятие с названием: ${actives[i-1].activityname}`)
                  message.author.send(embed)
              })
          }
      })
    }
    if(args[0]==='off')
    {
      let str3=''
      await  active.find({
          active: true
        }, async(err,actives)=>{
          if(err) console.log(err);
          if(actives.length===0)
          {
              message.author.send('Сейчас нет отключенных мероприятий.')
          }
          else {
              for(i=0;i<actives.length;i++)
              {
                  str3 += `**${i+1}.** ${actives[i].activityname}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к выключению мероприятия:`).setDescription(str3)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите выключить мероприятие, напишите номер мероприятия.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= actives.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  actives[i-1].active=false;
                  actives[i-1].save();
                  embed.setTitle(`Вы выключили мероприятие с названием: ${actives[i-1].activityname}`)
                  message.author.send(embed)
              })
          }
      })
    }
    if(args[0]==='delete')
    {
      let str3=''
      await  active.find({
        }, async(err,actives)=>{
          if(err) console.log(err);
          if(!actives)
          {
              message.author.send('Еще нет добавленных мероприятий.')
          }
          else {
              for(i=0;i<actives.length;i++)
              {
                  str3 += `**${i+1}.** ${actives[i].activityname}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к удалению мероприятия:`).setDescription(str3)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите удалить мероприятие, напишите номер мероприятия.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= actives.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  let names = actives[i-1].activityname
                  actives[i-1].delete();
                  embed.setTitle(`Вы удалили опрос/форму с названием: ${names}`)
                  message.author.send(embed)
              })
          }
      })
    }
/*

        let textchat = await newvoice.guild.createChannel( ivent[keys[itle-1]].activityname, {
            type: 'text',
            parent: config.CategoryIvent,
            permissionOverwrites: 
            [{
            type: 'role',
            id: '617776960097091783',
            allow: ['READ_MESSAGES','SEND_MESSAGES']
          },
          {
            id: newmember.id,
            allow: ['MANAGE_ROLES','READ_MESSAGES','SEND_MESSAGES', 'CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS','MANAGE_MESSAGES']
          }
        ]})*/
}
            
module.exports.help = {
    name: "activity"
}