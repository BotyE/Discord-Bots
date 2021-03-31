const Discord = require("discord.js");
const fs= require("fs");
const shop=require("../models/shop.js");
module.exports.run = async (bot,message,args) =>{
    if(args[0]==="add")
    {
        let embed1= new Discord.MessageEmbed().setTitle(`Введите ID роли:`)
    let mes = await message.author.send(embed1)
    let it=0;
    let name;
    let quest =[]
    let ans =''
    let str
    let much;
    let embedcost;
    console.log(1)
        const collector = mes.channel.createMessageCollector(m => m.author.id===message.author.id, {time: 600000})
   let now;
        collector.on('collect', async msg => {
          console.log(msg)
            switch(it) {
              case 0:
                  name = msg.content;
                  let role = message.guild.roles.cache.find(role => role.id === name)
                  let rolestart = message.guild.roles.cache.find(role => role.id === "651029153365360640")
                  let roleend = message.guild.roles.cache.find(role => role.id === "651456822011494410")
                  if((role.position>rolestart.position || roleend.position>role.position))
                  {
                      message.author.send("Эту роль нельзя добавить к продаже")
                    collector.stop();
                    return;
                  }
                  let embed2= new Discord.MessageEmbed().setTitle(`Введите стоимость.`)
                  message.author.send(embed2)
                  it+=1;
                  break;
            case 1:
                much = msg.content
                embedcost = new Discord.MessageEmbed().setTitle(`Place | Покупка роли.`).setDescription(`<@&${name}>
Стоимость роли: ${much} ${decOfNum(much, ['Акр', 'Акра', 'Акров'])}`).setFooter("Покупка роли осуществляется сроком на 1 месяц")
                  message.author.send(embedcost)
                  let embed4= new Discord.MessageEmbed().setTitle("Добавить покупку?")
                  message.author.send(embed4)
                  it+=1;
                  break;
              case 2:
                  if(msg.content='yes')
                    {
                        let mess1234 = message.guild.channels.cache.find(x => x.id === "650795663516368906")
                        await  shop.findOne({
                            id_role: name
                          }, async(err,shops)=>{
                            if(err) console.log(err);
                            if(!shops)
                            {
                                let reactmess = await mess1234.send(embedcost)
                              await reactmess.react(message.guild.emojis.cache.get('709722631020085348'))
                              const NewForms = new shop({
                                id_role: name,
                                id_mess: reactmess.id,
                                cost: much
                              })
                              NewForms.save();
                            }
                            
                            else{
                                message.author.send("Эта роль уже продается.")
                            }
                          })
                      
                    }
                    else message.author.send('Вы отменили создание продажи.')
                  collector.stop();
                  break;
            }
        })
    }
    if(args[0]==="off")
    {
      await  shop.find({
        active: true
      }, async(err,shops)=>{
        if(err) console.log(err);
        if(!shops)
        {
          return message.author.send("В магазине нет ролей.")
        }
        let str1=""
        for(i=0;i<shops.length;i++)
                {
                  let rolefind = message.guild.roles.cache.get(shops[i].id_role)
                    str1 += `**${i+1}.** ${rolefind.name}\n\n`
                }
        let embed1= new Discord.MessageEmbed().setTitle(`Доступные к выключению покупки роли:`).setDescription(str1)
    let mes = await message.author.send(embed1)
    let it=0;
    let name;
    let quest =[]
    let ans =''
    let str
    let much;
    let embedcost;
    console.log(1)
        const collector = mes.channel.createMessageCollector(m => m.author.id===message.author.id, {time: 600000})
   let now;
        collector.on('collect', async msg => {
          console.log(msg)
            switch(it) {
              case 0:
                  name = msg.content;
                  if((role.position>rolestart.position || roleend.position>role.position))
                  {
                      message.author.send("Эту роль нельзя добавить к продаже")
                    collector.stop();
                    return;
                  }
                  let embed2= new Discord.MessageEmbed().setTitle(`Введите стоимость.`)
                  message.author.send(embed2)
                  it+=1;
                  break;
            case 1:
                much = msg.content
                embedcost = new Discord.MessageEmbed().setTitle(`Place | Покупка роли.`).setDescription(`<@&${name}>
Стоимость роли: ${much} ${decOfNum(much, ['Акр', 'Акра', 'Акров'])}`).setFooter("Покупка роли осуществляется сроком на 1 месяц")
                  message.author.send(embedcost)
                  let embed4= new Discord.MessageEmbed().setTitle("Добавить покупку?")
                  message.author.send(embed4)
                  it+=1;
                  break;
              case 2:
                  if(msg.content='yes')
                    {
                        let mess1234 = message.guild.channels.cache.find(x => x.id === "650795663516368906")
                        await  shop.findOne({
                            id_role: name
                          }, async(err,shops)=>{
                            if(err) console.log(err);
                            if(!shops)
                            {
                                let reactmess = await mess1234.send(embedcost)
                              await reactmess.react(message.guild.emojis.cache.get('709722631020085348'))
                              const NewForms = new shop({
                                id_role: name,
                                id_mess: reactmess.id,
                                cost: much
                              })
                              NewForms.save();
                            }
                            
                            else{
                                message.author.send("Эта роль уже продается.")
                            }
                          })
                      
                    }
                    else message.author.send('Вы отменили создание формы.')
                  collector.stop();
                  break;
            }
        })
      })
    }
    function decOfNum(number, titles)
{
    let decCache= [],
          decCases = [2, 0, 1, 1, 1, 2];
    if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
}
}
            
module.exports.help = {
    name: "buyrole"
}