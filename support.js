const Discord = require("discord.js");

const fs = require("fs");

const mongoose = require("mongoose");


const config = require("./models/config.js")

const bot = new Discord.Client({disableEveryone: true});

mongoose.connect('mongodb://localhost:27017/Support',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})

bot.commands = new Discord.Collection();

bot.events = new Discord.Collection();

fs.readdir("./commands/",(err,files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() ==="js")

  if(jsfile.length <=0) {
    console.log("Нет такой команды");
    return;
  }

  jsfile.forEach((f,i)=> {
      let props = require(`./commands/${f}`);
      console.log(`Команда ${f} загрузился!`);
      bot.commands.set(props.help.name,props);
  });

});

fs.readdir("./events/",(err,files) =>{

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() ==="js")

  if(jsfile.length <=0)  {
    console.log("Нет такого ивента");
    return;
  }
  jsfile.forEach((f,i)=> {
      let props = require(`./events/${f}`);
      console.log(`Евент ${f} загрузился!`);

      bot.events.set(props.help.name,props);

  });
});
bot.on("raw",name =>{
  let eventfile = bot.events.get(name.t)
  if(eventfile) eventfile.run(bot,name);
})
bot.on("ready",async () => {
  console.log(`${bot.user.username} онлайн!`);
 const opp = await config.findOne({
  id_guild: "531394971107065857"
})
console.log(opp)
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
 
  let prefix = "==";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(prefix.length);
  let commandfile = bot.commands.get(cmd.slice(prefix.length))
  if(commandfile) commandfile.run(bot,message,args);
  if(cmd[0] === prefix)
  {
    message.delete().catch(O_o=>{});
  }
});

bot.on("voiceStateUpdate",(oldermember,newmember)=>{
    
      
})

bot.login("NjUxMTU0OTA5Nzg5NDIxNTY4.Xr0LOg.qZZ7WQgyZWYcizy2l676-eqCXGM");