const Discord = require("discord.js");
const fs= require("fs");
var moment = require('moment');
moment().format();
const stat=require("../models/stat.js");
const week=require("../models/week.js");
const bonus=require("../models/bonus.js");
module.exports.run = async (bot,message,args) =>{
  bonus.findOne({
    id: message.author.id
  }, (err,bonuss)=>{
             stat.findOne({
              id_member: message.author.id
              }, (err,stats)=>{
                let datenow = Date.now();
                if(stats)
                    {
                        if(stats.connect_time>stats.disconnect_time)
                {
                    if(message.member.voiceChannel && message.member.voiceChannel.id!='650781856219791374')
                    {
                let gettime=(datenow - stats.connect_time);
                stats.connect_time=datenow
                stats.points+=gettime/4000
                stats.akr+=round(gettime/60000,1)
                console.log(moment().year())
                stats.time_in_voice+=gettime;
                week.findOne({
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
                time_in_voice: gettime,
                message_count: 0,
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
                      weeks.time_in_voice+=gettime;
                      weeks.save();
                    }
                  });
                }
                else stats.connect_time=datenow
                }
            }
            while(stats.points && stats.points>=stats.need_points)
                {
                    console.log(stats.points)
                    stats.akr+=stats.need_points/4
                    stats.lvl+=1;
                    stats.points-=stats.need_points
                    stats.need_points+=100*stats.lvl+500
                    
                }
                if(err) console.log(err);
                let level = 40*stats.points/stats.need_points;
                
                console.log(level)
                let uroven = ''
                for(let i=0;i<level;i++)
                {
                    uroven+='???'
                }
                for(let i=level;i<40;i++)
                {
                    uroven+='???'
                }
            let data= 54915000
            week.findOne({
                id: message.author.id,
                week: moment().isoWeek(),
                year: moment().year()
              }, (err,weeks)=>{
                let mounths = ['????????????','??????????????','??????????','????????????','??????','????????','????????','??????????????','????????????????','??????????????','????????????','??????????????']
                let birthday;
                if(stats.birth[0]===0)
                  birthday = ''
                else birthday = `???????? ????????????????: ${stats.birth[0]} ${mounths[stats.birth[1]-1]}`
            let embed = new Discord.RichEmbed().setTitle(`???????????????????? ???????????????????????? ${message.author.username}:`).setDescription(`?????????? ???? ????????????: ${dateJoin(stats.joinDate)}
${birthday}`).addField(`**?????????????? ????????????????????????:   ${stats.lvl}**     |     **${round(stats.points,1)}???????????${stats.need_points}????????**`,`\`${uroven}\``,false).addField(`?????? ????????????????:`,`\`\`\`${bonuss.bonus_code}\`\`\``,false).addField(`???????\*\*??????????????:\*\*`,`\`${stats.rating} ${decOfNum(stats.rating, ['????????','??????????','????????????'])}.\``,true).addField(`???????\*\*?????????????????? ????????????:\*\*`,`\`${time(stats.time_in_voice)}\``,true).addField(`????\*\*??????????????????:\*\*`,`\`${stats.messages_count}\``,true).addField(`????\*\*??????????????????:\*\*`,`${stats.gectar} ????     
${round(stats.akr,1)} <:akr:672371289373016075>
<:rubycase:672371290723713034>\`0\`<:perfectcase:672371290577043477>\`0\`
<:goldcase:672371290463535123>\`0\`<:litecase:672371290073595904>\`0\``,true).addField(`\*\*?????????????????? ???? ?????? ????????????:\*\*`,`\`${weeks.reputation_count} ${decOfNum(weeks.reputation_count, ['??????????????','????????????????','??????????????????'])}.\``,true).addField(`\*\*???????????????????? ?????????? ???? ???????? ???????????? ?? ????????????????????????:\*\*`,`\`${weeks.activity_wins} ??????????.\``,true).addField(`\*\*?????????? ?????????? ??????????????????????????:\*\*`,`\`${stats.rub} ${decOfNum(stats.rub,['??????????','??????????','????????????'])}.\``,true)
.addField(`\*\*???????????????????? ????????????????????????????:\*\*`,`\`????????????: ${stats.verebal_warns}\`
\`????????????????????: ${stats.writen_warns}\``,true).addField(`\*\*???????????????????? ??????????\*\*`,`\`??????: ${stats.chat_mute} ${decOfNum(stats.chat_mute, ['??????','????????','??????'])}.\`
\`??????????????????: ${stats.voice_mute} ${decOfNum(stats.voice_mute, ['??????','????????','??????'])}.\``,true).addField(`\*\*???????????????????? ??????????\*\*`,`\`${stats.bans}\``,true)
/*.addField(`\*\*?????????????????? ????????:\*\*`,`\`VIP:\`
Sponsor - ???????????????? 7 ???????? 14 ??????????.
Benefactor - ???????????????? 21 ???????? 3 ????????.
\`???????????????? ????????:\`
?????????????? - ???????????????? 7 ???????? 14 ??????????.
???????????????? - ???????????????? 7 ???????? 14 ??????????.
???????? - ???????????????? 7 ???????? 14 ??????????.`,true).addField(`\*\*?????????????????? ??????????????:\*\*`,`?????????????? ?? ?????????????????? - 10 ??????????.
?????????????? ?? ???????????? -  10 ???????? 10 ??????????.
?????????????? ?? ?????????? - 30 ???????? 12 ??????????.`,true)
            .addField(`\*\*?????????? ??????:\*\*`,`\`?????????? ?? ?????????????????? - 1 ??????????.\`
\`???????????????????? ?????????????????? - 5 ??????????.\`
\`?????????? ?????????????????????????? - 12 ??????????.\`
\`?????????????? ???????????????????????? - 11111 ??????????.\`
\`?????????????? ???? ???????????????????????? - 1122 ??????????.\`
\`???????????????????? ???????????? - 5 ??????????.\`
\`???????????????????? ?????? - 12 ??????????.\`
\`???????????????????? ???????????? - 11111 ??????????.\``)*/
            message.author.send(embed);
              })
            stats.save()
              })
            })
              function round(value, decimals) {
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }
            function dateJoin(value)
            {
              
              let moun = ['????????????','??????????????','??????????','????????????','??????','????????','????????','??????????????','????????????????','??????????????','????????????','??????????????']
              console.log(value)
              let data =padStr(value.getDate()) + ' '+moun[Number(value.getMonth())] +' '+padStr(value.getFullYear()) + ' '+padStr(value.getHours()) +':'+ padStr(value.getMinutes()) + ':'+padStr(value.getSeconds());
              
             return data;
            }
            function padStr(i) {
              return (i < 10) ? "0" + i : "" + i;
          }
        function time(data) {
            var time = Number(data);
            var hour = Math.floor((time / (1000 * 60 * 60)));
            var minute = Math.floor(((time / (1000 * 60))-hour*60));
            var second = Math.floor(((time / 1000)-hour*3600-minute*60));
            
            var temp = ``
            if(hour != 0)
                temp += hour + decOfNum(hour, [' ?????? ', ' ???????? ', ' ?????????? '])+`\n`
            if(minute !=0)
                    temp += minute+ decOfNum(minute, [' ???????????? ', ' ???????????? ', ' ?????????? '])+`\n`
            if(second != 0)
                temp += second + decOfNum(second, [' ??????????????', ' ?????????????? ', ' ???????????? '])
            if(temp.length<1)
                temp+=` `
                return temp;
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
    name: "stats"
}