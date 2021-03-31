const Discord = require("discord.js");
var moment = require('moment');
const wait=require("../models/wait.js");
const want=require("../models/want.js");
const active=require("../models/active.js");
moment().format();

module.exports.run = async (bot,message,args) =>{

  await  active.find({
    active: true
  }, async(err,actives)=>{
  //console.log(list);
  list=""
  for (let j = 0; j < actives.length; j++) {
    list= await list +(j+1)+") "+ actives[j].activityname+`\n\n`
  }
console.log(message.author.tag)
    want.findOne({
        id: message.author.id,
      }, async (err,wants)=>{
        if(err) console.log(err);
        if(wants && (Date.now()-wants.time)<1800000)
        {
            return message.author.send(`Вы уже отправляли просьбу за последние полчаса!`)
            
        }
        wait.findOne({
            id: message.author.id,
            name: "want",
            cnt: 1
          }, async (err,waits)=>{
        
            if(err) console.log(err);
            if(!waits)
            {
              const Newwait = new wait({
                id: message.author.id,
                name: "want",
                cnt: 1
              })
              Newwait.save()

    let embed= new Discord.RichEmbed().setTitle(`Выбирите мероприятие для создания просьбы!`).setDescription(`**Пришлите номер мероприятия из списка:**
${list}`)

    const filter = response => Number(response.content) >= 1 && Number(response.content) <= actives.length;
    let mess = await message.author.send(embed)
      mess.channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] }).then( async (collected) => {
        itle = collected.array()[0].content;
        wait.findOne({
            id: message.author.id,
            name: "want",
              cnt: 1
          }, async (err,waits)=>{
        
            if(err) console.log(err);
            if(waits)
            {
              waits.delete()
            }
          })
            if(!wants)
            {
                const Newwant = new want({
                    id: message.author.id,
                    time: Date.now()
                  })
                  Newwant.save()
            }
            else{
                wants.time=Date.now()
                wants.save()
            }
            let channelsend = message.guild.channels.find(x => x.id === `671360484867440640`);
            let embed1= new Discord.RichEmbed().setDescription(`${message.author} просит запустить "${actives[itle-1].activityname}"`)
            channelsend.send(embed1)
            message.author.send(`Вы успешно отправили просьбу на запуск мероприятия по игре: "${actives[itle-1].activityname}"
Следующая просьба будет доступна через полчаса.`)
      }).catch(err => {
          message.author.send(`Вы не успели создать просьбу, попробуйте заново!`)
          wait.findOne({
            id: message.author.id,
            name: "want",
            cnt: 1
          }, async (err,waits)=>{
        
            if(err) console.log(err);
            if(waits)
            {
              waits.delete()
            }
          })
        })
    }
})
    })
  })

}
module.exports.help = {
    name: "want"
}