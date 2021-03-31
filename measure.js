const config = require("./config.json");
const moment = require('moment');
moment.locale('ru');
const mongoose = require("mongoose");
const Discord = require("discord.js");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
  const activity=require("./models/activity.js");
  const active=require("./models/active.js");
  const count=require("./models/count.js");
  const wait=require("./models/wait.js");

  const activity_game=require("./models/activity_game.js");
const fs= require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
moment().format();
fs.readdir("./commands/",(err,files) =>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() ==="js")
  if(jsfile.length <=0)
  {
    console.log("Нет такой команды");
    return;
  }
  jsfile.forEach((f,i)=> {
      let props = require(`./commands/${f}`);
      console.log(`${f} загрузился!`);
      bot.commands.set(props.help.name,props);

  });
});
bot.on("ready",async () => {
  let private = bot.channels.find(x => x.id === "652841563491139586");
  private.send(`<@${bot.user.id}> онлайн!`);
  bot.user.setActivity("за статистикой", { type: "WATCHING" });
console.log(moment().format('dddd, HH:mm:ss DD.MM.YYYY'));
});
var itle;
bot.on("voiceStateUpdate",async (oldermember,newmember)=>{
  let oldvoice = oldermember.voiceChannel;
  let newvoice = newmember.voiceChannel;
  let user = newmember.user;
  let list="";
  let channelroom=[];  
  let ivent = require(`./json/1.json`);
  let film = require(`./json/film.json`);
  let filmlist="";
 // var obj = JSON.parse(ivent);
//let keys = await Object.keys(ivent);
//for (var i = 0; i < keys.length; i++) {
//  list= await list+(i+1)+") "+ ivent[keys[i]].activityname+`\n`
  //console.log(ivent[keys[i]].activityname);
//}
let key = await Object.keys(film);
for (let j = 0; j < key.length; j++) {
  filmlist= await filmlist+(j+1)+") "+ film[key[j]].name+`\n`
  //console.log(ivent[keys[i]].activityname);
}
await  active.find({
  active: true
}, async(err,actives)=>{
//console.log(list);
for (let j = 0; j < actives.length; j++) {
  list= await list +(j+1)+") "+ actives[j].activityname+`\n\n`
}
  let embed= new Discord.RichEmbed().setTitle(`Выбирите мероприятие для запуска`).setDescription(list)

       if(newvoice&&newvoice.id==config.CreateIvent)
        {
          wait.findOne({
            id: user.id,
            name: "activity",
            cnt: 1
          }, async (err,waits)=>{
        
            if(err) console.log(err);
            if(!waits)
            {
              const Newwait = new wait({
                id: user.id,
                name: "activity",
                cnt: 1
              })
              Newwait.save()
              
            activity.findOne({
              id: user.id,
              timeend: 1
            }, async (err,activitys)=>{
              if(err) console.log(err);
              if(!activitys)
              {
                
            
          const filter = response => Number(response.content) >= 1 && Number(response.content) <= actives.length;
    let mess = await user.send(embed)
      mess.channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] }).then( async (collected) => {
        itle = collected.array()[0].content;
        wait.findOne({
          id: user.id,
          name: "activity",
            cnt: 1
        }, async (err,waits)=>{
      
          if(err) console.log(err);
          if(waits)
          {
            waits.delete()
          }
        })
        let textchat = await newvoice.guild.createChannel( actives[itle-1].activityname, {
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
      ]})
      await channelroom.push(textchat.id)
      let voicechannel = await newvoice.guild.createChannel( actives[itle-1].activityname, {
        type: 'voice',
        userLimit: actives[itle-1].limit,
        parent: config.CategoryIvent,
        permissionOverwrites: 
        [{
        type: 'role',
        id: '617776960097091783',
        allow: ['CONNECT']
      },
      {
        id: newmember.id,
        allow: ['MANAGE_ROLES','CONNECT','SPEAK', 'CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS','MOVE_MEMBERS']
      }
    ]})
    await channelroom.push(voicechannel.id)
    let invite = await voicechannel.createInvite()
    newmember.setVoiceChannel(voicechannel.id).catch(err => user.send(`Зайдите в голосовой канал: ${invite.url}`));


      /*let im = {
        "color": 3553599,
        "title":`PLACE | ${actives[itle-1].activityname}`,
        "description":`\n\n[Полные правила](${actives[itle-1].activityrule})\n[Участвовать в мероприятии](${invite.url})`,
        "fields":[
              {
            "name":`${actives[itle-1].name}`,
            "value":`Приз зависит от времени. Минимум 5 акров.`,
            "inline":true
              }
            ],
            "image": {
              "url": actives[itle-1].picture
            },
        "footer":{
          "text":`Создал мероприятие - ${user.tag}`,
          "icon_url":`${user.displayAvatarURL}`
            }
          }*/
          let str = "⠀"
              let str1 = actives[itle-1].activityname.split(" ");
              let str2 =str1.length
              str1 = str1.join("⠀")
              let len = str.repeat(Math.floor((32-actives[itle-1].activityname.length+str2)/2))
    let im = {
        "color": 3553599,
        "title":`${len}__\`PLACE⠀|⠀${str1}\`__`,
        "description":`\n\n[Нажать для участия](${invite.url})⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀[Полные правила](${actives[itle-1].activityrule})`,
            "image": {
              "url": `${actives[itle-1].picture}`
            }
          }
          let mess1 = await voicechannel.guild.channels.find(x => x.id === "652887453526392867");
  
 let amess1 = await mess1.send({
        embed: im
    })
      let private = voicechannel.guild.channels.find(x => x.id === config.activitylog);
    private.send(newmember+` создал мероприятие `+actives[itle-1].activityname);

   for(let i=1;i<actives[itle-1].voice;i++)
       {
          let newvoicechat= await  newvoice.guild.createChannel( actives[itle-1].activityname+" "+i, {
              type: 'voice',
            userLimit: actives[itle-1].limit/actives[itle-1].voice,
              parent: config.CategoryIvent,
              permissionOverwrites: 
              [{
            type: 'role',
            id: '617776960097091783',
            deny: ['CONNECT']
          },
          {
            id: newmember.id,
            allow: ['MANAGE_ROLES','CONNECT','SPEAK', 'CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS','MOVE_MEMBERS']
          }
        ]})
          await channelroom.push(newvoicechat.id)

           }
           count.findOne({
            _id: "activity"
          }, async (err,counts)=>{
        
            if(err) console.log(err);
            counts.cnt=counts.cnt+1;
           let datenow = Date.now();
       const NewActiv = new activity({
          id: user.id,
          activity_Number: counts.cnt,
          Name: actives[itle-1].activityname,
          Id_activity: itle,
          mess: amess1.id,
          channels_id: channelroom,
          timestart: datenow,
          timeend: 1,
          games: 0,
          week: moment().week(),
          year: moment().year(),
          day: moment().date(),
          month: moment().month()+1,
          data: Date.now(),
          gamesmembers: {
            game: Number,
            members: Array
          }
        })
        user.send(`Вы создали мероприятие по игре ${actives[itle-1].activityname}!`)
        NewActiv.save();
        counts.save();
        
      })
      }).catch(collected => {
        wait.findOne({
          id: user.id,
          name: "activity",
          cnt: 1
        }, async (err,waits)=>{
      
          if(err) console.log(err);
          if(waits)
          {
            waits.delete()
          }
        })
      });
    }
    else{return ;}
})
    }
  });
      }


 if(newvoice&&newvoice.id==`671333636842455055`)
      {
        
          activity.findOne({
            id: user.id,
            timeend: 1
          }, async (err,activitys)=>{
        
            if(err) console.log(err);
            if(!activitys)
            {
              return  user.send(`У вас не запущено мероприятие!`)
            }
            let channels = await newvoice.guild.channels.find(x => x.id === activitys.channels_id[activitys.channels_id.length-1]);
            let len =activitys.channels_id.length-1
            let newchannel = await channels.clone(activitys.Name+" "+len,true,false)
            activitys.channels_id.push(newchannel.id)
            newchannel.setParent(config.CategoryIvent)
            user.send(`Вы создали дополнительную комнату!`)
            activitys.save()

          })
      }
    })
 if(newvoice&&newvoice.id==`650782058662199319`)
      {
  let embed1= new Discord.RichEmbed().setTitle(`Выбирите вид просмотра:`).setDescription(filmlist)
    let mes = await user.send(embed1)
    let it=0;
    console.log(1)
        const collector = mes.channel.createMessageCollector(m => m.author.id===user.id, {time: 300000})
   let now;
        collector.on('collect', async msg => {
          console.log(msg)
            switch(it) {
              case 0:
                now=Number(msg.content)
                console.log(now)
                if(now>0 && now<=key.length)
                {
                    it++;
                    if(now===1)
                    {
                      user.send(`Введите название фильма.(Например: Терминатор)`)
                    }
                    else if(now===2)
                    {
                      user.send(`Пришлите ссылку на комнату сайта - https://www.watch2gether.com/`)
                    }
                    else{
                      user.send(`Введите название сериала.(Например: Отбросы)`)
                    }
                }
                else
                {
                  user.send(`Введите номер вида просмотра.(Например: 1)`)
                }
                break;
              case 1:
                if(now===1)
                    {
                      const kpFilmId = await kp.getFilmId({
                        title: 'Звёздные войны: Пробуждение силы',
                        year: 2015, // optional
                        countries: ['США'], // optional
                      });
                      // 714888
                    
                      const kpFilmInfo = await kp.getFilmInfo(kpFilmId);
                      console.log(kpFilmId)
                      console.log(kpFilmInfo)
                    }
                    else if(now===2)
                    {
                      if(!msg.content.startsWith('https://www.watch2gether.com/rooms'))
                      {
                        user.send(`Пришлите ссылку на комнату сайта - https://www.watch2gether.com/`)
                      }
                      user.send(`Пришлите ссылку на комнату сайта - https://www.watch2gether.com/`)
                    }
                    else{
                      user.send(`Введите название сериала.(Например: Отбросы)`)
                    }

      }
    })
  }
})

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
 
  let prefix = "!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length))
  if(commandfile) commandfile.run(bot,message,args);
  if(cmd[0] === prefix)
  {
    message.delete().catch(O_o=>{});
  }
});

bot.login("NTgzOTkyNDU5NzkzNzkzMDI4.Xf3KIg.aAFBbg2favRz2j028w469tCBQWo");