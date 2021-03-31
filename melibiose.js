
const Discord = require("discord.js");
const fs= require("fs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Place',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const shop=require("./models/shop.js");
const timerole=require("./models/timerole.js");
const stat=require("./models/stat.js");
const week=require("./models/week.js");
const count=require("./models/count.js");
const bonus=require("./models/bonus.js");
var moment = require('moment');
let config = require("./config.json")
moment().format();


const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
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
  let private = bot.channels.cache.find(x => x.id === "652841563491139586");
  let sms = bot.channels.cache.find(x => x.id === "650700034479882259");
  private.send(`<@${bot.user.id}> онлайн!`);
  bot.user.setActivity("за статистикой", { type: "WATCHING" });
  setInterval(()=> { 
    let rand = getRandomInt(100)
    if(rand>97)
    {
      let clu = new Discord.MessageEmbed().setTitle(`Мойте руки с мылом на волне карантина.`)
      sms.send(clu)
    }

  },60000)
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let num = 0
  setInterval(()=> { 
    let member = bot.guilds.cache.array()[0].members.cache
    num+=1;
    member.forEach(async function(elem) {
  
      await  timerole.find({
        id: elem.id
      }, async (err,timeroles)=>{
        if(timeroles.length!=0)
        {
          for(let i=0;i<timeroles.length;i++)
          {
            let namerole = elem.roles.cache.get(timeroles[i].id_role)
         if(timeroles[i].time_end<Date.now())
        {
          elem.roles.remove(timeroles[i].id_role)
          elem.user.send(`Срок пользования ролью \"${namerole.name}\" закончился.`)
          timeroles[i].delete()
        }
        else if(timeroles[i].time_end-Date.now()<86400000 && num%6===0){
          elem.user.send(`Срок пользования ролью \"${namerole.name}\" закончится через ${time(timeroles[i].time_end-Date.now())}.`)
        }
    }
  }
})
    })

  },3600000)
  function time(data) {
    var time = Number(data);
    var hour = Math.floor((time / (1000 * 60 * 60)));
    var temp = ``
    if(hour != 0)
        temp += hour + decOfNum(hour, [' час ', ' часа ', ' часов '])
        return temp;
  }
  function decOfNum(number, titles)
{
    let decCache= [],
          decCases = [2, 0, 1, 1, 1, 2];
    if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
}
});
bot.on('inviteCreate', async m =>{
  console.log(m)
})
bot.on('guildMemberAdd', async member => {
  console.log(member)
  await  stat.findOne({
    id_member: member.id
  }, async(err,stats)=>{
    if(err) console.log(err);
    if(!stats)
    {
      const NewStats = new stat({
        id: member.id,
time_in_voice: 0,
messages_count: 1,
joinDate: member.joinedAt,
id_member: member.id,
rating: 0,
rep: 0,
akr: 0,
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
disconnect_time: 0,
birth: [0]
      })

      NewStats.save();
    }
  })
  
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  message.channel.createInvite({
    targetUser: 419080180137721856
  }).then(invite => console.log(invite))
  if(message.channel.type === "dm") return;
 await count.findOne({
    _id: "id"
  }, async (err,counts)=>{

    if(err) console.log(err);
    counts.cnt=counts.cnt+1;
    let alfabit= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
    let code = ''
    let num = counts.cnt
    for(let i=3;i>=0;i--)
    {
        let Pow = Math.pow(36,i)
        let flor = Math.floor(num/Pow)
        code += alfabit[flor]
        num -= flor*Pow
    }
  await  bonus.findOne({
      id: message.author.id
    }, async (err,bonuss)=>{
      if(!bonuss)
      {
      
    const NewBonus = new bonus({
      id: message.author.id,
  bonus_code: code,
  count_activates: 0
    })
    NewBonus.save()
  }
  else counts.cnt-=1
  counts.save()
  })
  
 await stat.findOne({
    id_member: message.author.id
    }, async(err,stats)=>{
  console.log(message.author.id)
      if(err) console.log(err);
      if(!stats)
      {
        const NewStats = new stat({
          id: counts.cnt,
  time_in_voice: 0,
  messages_count: 1,
  joinDate: message.member.joinedAt,
  id_member: message.author.id,
  rating: 0,
  rep: 0,
  akr: 0,
  gectar: 0,
  lvl: 0,
  points: message.content.length/15,
  need_points: 500,
  rub: 0,
  chat_mute: 0,
  voice_mute: 0,
  verebal_warns: 0,
  writen_warns: 0,
  bans: 0,
  connect_time: 0,
  disconnect_time: 0,
  birth: [0]
        })
  
        NewStats.save();
      }
      else
      {
        stats.messages_count+=1;
        stats.points+=message.content.length/15
        stats.save();
      }
    });
  })
  await  week.findOne({
      id: message.author.id,
      week: moment().isoWeek(),
      year: moment().year()
    }, (err,weeks)=>{
  
      if(err) console.log(err);
      if(!weeks)
      {
        const NewStats = new week({
          id: message.author.id,
  week: moment().isoWeek(),
  year: moment().year(),
  rating: 0,
  time_in_voice: 0,
  message_count: 1,
  activity_wins: 0,
  activity_count: 0,
  reputation_count: 0,
  donate: 0,
  bonus: 0
        })
  
        NewStats.save();
      }
      else
      {
        weeks.message_count+=1;
        weeks.save();
      }
    });

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

bot.on("voiceStateUpdate",async (oldermember,newmember)=>{
  let oldvoice = oldermember.voiceChannel;
  let newvoice = newmember.voiceChannel;
  let user = newmember.user;
  let member1 = newmember.guild.member(user);
    let datenow = Date.now();
    console.log(newvoice + ' ' + oldvoice)
    stat.findOne({
      id_member: user.id
    }, async (err,stats)=>{
  
      if(err) console.log(err);
      if(!stats)
      {
        
        const NewStats = new stat({
          id: user.id,
          joinDate: member1.joinedAt,
          id_member: user.id,
          connect_time: Date.now(),
          birth: [0]
        })
  
        NewStats.save();
      }
      else
      {
        stats.connect_time=Date.now();
        stats.save();
      }
    });
})
bot.on('raw', react => {
  if(react.t === `MESSAGE_REACTION_ADD` && react.d.channel_id==='650795663516368906')
  {
console.log(react.d.channel_id)
    let reactionChannel = bot.channels.cache.get(react.d.channel_id);
    reactionChannel.messages.fetch(react.d.message_id).then(msg=>{
      let msgReaction = msg.reactions.cache.get(react.d.emoji.id);
      let user = bot.users.cache.get(react.d.user_id);
      return bot.emit('messageReactionAdd',msgReaction,user);
    });

}
});
bot.on('messageReactionAdd', async (messageReaction,user) => {
  console.log(messageReaction)
  if(messageReaction.message.channel.id!='650795663516368906')
  return;
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    if(user.bot)
      return;
 //     await member.roles.add('709773438126129173').catch(console.log);
  await messageReaction.users.remove(member).catch(console.error);
  await  shop.findOne({
    id_mess: message.id
  }, async(err,shops)=>{
    console.log(shops.id_role)
    if(err) console.log(err);
    stat.findOne({
    id_member: user.id
    }, async (err,stats)=>{
      if(stats)
      {
    if(shops.cost<stats.akr)
    {
      stats.akr=stats.akr-shops.cost;
      member.roles.add(shops.id_role).catch(console.log);
      console.log(shops.id_role)
      let privet = message.guild.channels.cache.get('652841705627975681')
      let namerole1 = member.guild.roles.cache.get(shops.id_role)
      await  timerole.findOne({
        id: user.id,
        id_role: shops.id_role
      }, async (err,timeroles)=>{
        if(!timeroles)
        {
          privet.send(`${user} купил роль <@&${shops.id_role}>. Оставшийся баланс пользователя ${stats.akr}.`)
          user.send(`Вы купили роль \"${namerole1.name}\" сроком на один месяц. Для продления или повторной покупки нажмите на реакцию заново.`)
          const NewForms = new timerole({
            id: user.id,
            id_role: shops.id_role,
            time_end: Date.now()+2592000000
          })
          NewForms.save();
        }
        else{
          privet.send(`${user} продлил роль <@&${shops.id_role}>. Оставшийся баланс пользователя ${stats.akr}.`)
          user.send(`Вы продлили роль \"${namerole1.name}\" сроком на один месяц. Для продления или повторной покупки нажмите на реакцию заново.`)
          timeroles.time_end=Number(timeroles.time_end)+2592000000
          timeroles.save()
        }
    })
    }
  stats.save()
}
    })
})

});
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
bot.login(config.token); 
