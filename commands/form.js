const Discord = require("discord.js");
const fs= require("fs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const form=require("../models/form.js");
const count=require("../models/count.js");
module.exports.run = async (bot,message,args) =>{
    if(args[0]==="add")
    {
        let embed1= new Discord.RichEmbed().setTitle(`Название формы:`)
    let mes = await message.author.send(embed1)
    let it=0;
    let name;
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
                  name = msg.content;
                  embed1.setTitle('Введите вопросы одним сообщением. Каждый вопрос на новой строке.')
                  message.author.send(embed1)
                  it+=1;
                  break;
              case 1:
                  str = msg.content.split('\n')
                  for(let i=0;i<str.length;i++)
                    ans += `**${i+1}.** ${str[i]} \n`
                  embed1.setTitle(name).setDescription(ans)
                  message.author.send(embed1)
                  let embed2= new Discord.RichEmbed().setTitle(`Создать форму?`)
                  message.author.send(embed2)
                  it+=1
                  break;
              case 2:
                  if(msg.content='yes')
                    {
                        let textchat = await message.guild.createChannel( name, {
                            type: 'text',
                            parent: '699206406313607228',
                            permissionOverwrites: 
                            [{
                            type: 'role',
                            id: '617776960097091783',
                            deny: ['READ_MESSAGES','SEND_MESSAGES']
                          },
                          {
                            id: message.author.id,
                            allow: ['MANAGE_ROLES','READ_MESSAGES','SEND_MESSAGES', 'CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS','MANAGE_MESSAGES']
                          }
                        ]})
                        let newmes = await textchat.send(embed1)
                        newmes.pin();
                        await  count.findOne({
                            _id: 'form'
                          }, async(err,counts)=>{
                            if(err) console.log(err);
                        
                        await  form.findOne({
                            name: name
                          }, async(err,forms)=>{
                            if(err) console.log(err);
                            if(!forms)
                            {
                              const NewForms = new form({
                                name: name,
                                cnt: counts.cnt,
                                question: str,
                                num: 0,
                                active: true,
                                answer: textchat.id
                              })
                        
                              NewForms.save();
                            }
                          })
                        })
                    }
                    else message.author.send('Вы отменили создание формы.')
                  collector.stop();
                  break;
            }
        })
    }
    if(args[0]==='list')
    {
        let str1=''
        await  form.find({
            active: true
          }, async(err,forms)=>{
            if(err) console.log(err);
            if(!forms)
            {
                message.author.send('Сейчас нет активных опросов/наборов.')
            }
            else {
                for(i=0;i<forms.length;i++)
                {
                    str1 += `**${i+1}.** ${forms[i].name}\n\n`
                }
                let embed3= new Discord.RichEmbed().setTitle(`Доступные формы:`).setDescription(str1)
                message.author.send(embed3)
                let embed= new Discord.RichEmbed().setTitle(`Если вы хотите поучаствовать в опросе/наборе, напишите номер формы.`)
                const filter = response => Number(response.content) >= 1 && Number(response.content) <= forms.length;
                 let mess = await message.author.send(embed)
                mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                    i = collected.array()[0].content;
                    embed.setTitle(`Вы участвуете в опросе/наборе с названием: ${forms[i-1].name}`).setDescription(`Сейчас вам будут присылаться вопросы, на которые вы должны ответить.
Предупреждение. Отвечайте адекватно, использование опросов/наборов не по назначению наказуемо.`)
                    message.author.send(embed)
                    let embed4= new Discord.RichEmbed().setTitle(`1. ${forms[i-1].question[0]}`)
                    message.author.send(embed4)
                    const collector = mess.channel.createMessageCollector(m => m.author.id===message.author.id, {time: 3600000})
                    let j=0
                    let answer1  = ''
        collector.on('collect', async msg => {
          console.log(msg)
            answer1+=`${j+1}. ${forms[i-1].question[j]}\n${msg.content}\n\n`
            j+=1
            if(j!=forms[i-1].question.length)
            {
            embed4.setTitle(`${j+1}. ${forms[i-1].question[j]}`)
                    message.author.send(embed4)
            }
            else {
                embed4.setTitle(`Вы успешно прошли опрос/набор.`)
                message.author.send(embed4)
                let embed5= new Discord.RichEmbed().setTitle(`${forms[i-1].name}`).setDescription(`Автор - ${message.author}\n\n${answer1}`)
                let standartch = message.guild.channels.find(x => x.id === forms[i-1].answer);
                standartch.send(embed5);
                collector.stop();
            }
        })
                })
            }
        })

    }
    if(args[0]==='on')
    {
      let str2=''
      await  form.find({
          active: false
        }, async(err,forms)=>{
          if(err) console.log(err);
          if(!forms)
          {
              message.author.send('Сейчас нет отключенных опросов/наборов.')
          }
          else {
              for(i=0;i<forms.length;i++)
              {
                  str2 += `**${i+1}.** ${forms[i].name}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к включению формы:`).setDescription(str2)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите включить форму, напишите номер формы.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= forms.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  forms[i-1].active=true;
                  forms[i-1].save();
                  embed.setTitle(`Вы включили опрос/форму с названием: ${forms[i-1].name}`)
                  message.author.send(embed)
              })
          }
      })
    }
    if(args[0]==='off')
    {
      let str3=''
      await  form.find({
          active: true
        }, async(err,forms)=>{
          if(err) console.log(err);
          if(!forms)
          {
              message.author.send('Сейчас нет отключенных опросов/наборов.')
          }
          else {
              for(i=0;i<forms.length;i++)
              {
                  str3 += `**${i+1}.** ${forms[i].name}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к выключению формы:`).setDescription(str3)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите выключить форму, напишите номер формы.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= forms.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  forms[i-1].active=false;
                  forms[i-1].save();
                  embed.setTitle(`Вы выключили опрос/форму с названием: ${forms[i-1].name}`)
                  message.author.send(embed)
              })
          }
      })
    }
    if(args[0]==='delete')
    {
      let str3=''
      await  form.find({
        }, async(err,forms)=>{
          if(err) console.log(err);
          if(!forms)
          {
              message.author.send('Сейчас нет опросов/наборов.')
          }
          else {
              for(i=0;i<forms.length;i++)
              {
                  str3 += `**${i+1}.** ${forms[i].name}\n\n`
              }
              embed3= new Discord.RichEmbed().setTitle(`Доступные к удалению формы:`).setDescription(str3)
              message.author.send(embed3)
              embed= new Discord.RichEmbed().setTitle(`Если вы хотите удалить форму, напишите номер формы.`)
              filter = response => Number(response.content) >= 1 && Number(response.content) <= forms.length;
              mess = await message.author.send(embed)
              mess.channel.awaitMessages(filter, { maxMatches: 1, time: 600000, errors: ['time'] }).then( async (collected) => {
                  i = collected.array()[0].content;
                  let delchan = message.guild.channels.find(x => x.id === forms[i-1].answer);
                  let names = forms[i-1].name
                  delchan.delete("Удаление опроса/формы.")
                  forms[i-1].delete();
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
    name: "form"
}