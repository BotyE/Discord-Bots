const Discord = require("discord.js");
const fs= require("fs");
module.exports.run = async (bot,message,args) =>{
    if(!message.member.roles.some(r=> ['509903786383245333'].includes(r.id) || message.author.id=== `226767223941758976`|| message.author.id=== `362640125991190531`)) return;
    
    let winers = [];
    let i=0;
    let embed = new Discord.RichEmbed();
    let param = ["1000 Акров", "50 Гектар","VIP Start","VIP Lite","VIP Medium","VIP Iron"]
    let winss = Math.floor(Math.random() * (6));
    let timeout =5000;
    let timers = time(5000+Date.now());
    let embed1 ={
        "content": "adada",
        "color": 0,
        "author": {
          "name": "Розыгрыш на 1 победителя",
          "icon_url": "https://cdn.discordapp.com/attachments/524994373042307073/701770309841453086/s1200.png"
        },
        "description": `Приз: ${param[winss]}`,
        "footer": {
          "text": `Время окончания розыгрыша: ${timers}`
        }
    }
      

    let confirm = await message.channel.send({content: "1",embed:embed1});
    await confirm.react('🎁');

    setTimeout(wis, timeout);
    function wis(){
    let counts = confirm.reactions.get('🎁').count;
    let aa= confirm.reactions.get('🎁').users;
    console.log(aa)
    console.log(counts);
       let  wins = Math.floor((Math.random() * (counts-1))+1);
        console.log(wins);
        message.channel.send(`Победитель ${aa[wins]}\nПриз: ${param[winss]}`);
}
    function time(data) {
        var time = new Date(data);
        let month = [`Января`,`Февраля`,`Марта`,`Апреля`,`Мая`,`Июня`,`Июля`,`Августа`,`Сентября`,`Октября`,`Ноября`,`Декабря`];
        let month1 = time.getMonth();
        let day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var sec = time.getSeconds();
        var temp = day +` `+month[month1] +' '+ ((hour == 0) ? "00:" : `${hour}:`);
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
      function sleep(millis) {
        var t = (new Date()).getTime();
        var i = 0;
        while (((new Date()).getTime() - t) < millis) {
            i++;
        }
    }
}
module.exports.help = {
    name: "hoax"
}