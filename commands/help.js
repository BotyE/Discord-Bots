const Discord = require("discord.js");

const fs= require("fs");

const config = require("../models/config.js")

const active_chat = require("../models/active_chat.js")

module.exports.run = async (bot,message,mongoose) =>{
    let guild_id = message.guild.id
    let guild_active;
    let bol;
    let activits=false;
    active_chat.findOne({
        id_person: message.author.id
    }, async (err,active_chats) => {
        if(err)
            return console.log(err)
        if(!active_chats)
        {
            const NewActive = new active_chat({
                id_person: message.author.id,
                id_guild: guild_id,
                active_help: true,
                last_message: Date.now()
            })
            NewActive.save()
            activits=true;
            help();
        }
        else {
            guild_active = bot.guilds.cache.get(active_chats.id_guild);
            if(active_chats.active_help)
                return message.author.send(`Вы уже используете бота через сервере "${guild_active.name}".`)
            if(active_chats.last_message+600000>Date.now())
                return;
            activits=true;
            help();
        }
    })
    async function help() {
    var query;
    let timer1 = setInterval(async function() {
        if(activits)
        {
        query = await active_chat.find({active_help: true}).exec().then()
        }
        else {
            clearInterval(timer1);
        }
    }, 100)
    let ask = false, help = true, helper, new_help_message, message_saved, help_await, ticket,helper_chat, i=0;
    let helper_chat_msg= new Discord.MessageEmbed(), quest_chat_msg= new Discord.MessageEmbed();
    let guild = bot.guilds.cache.get(message.guild.id);
    let chat = guild.channels.cache.get('703906948873191485');
    let quest = new Discord.MessageEmbed().setDescription(`Опишите ваш вопрос, сообщением ниже, максимально понятно. Или же нажмите на реакцию ❌, если вы случайно прописали команду.`);
    let send_message = await message.author.send(quest);
    let send_react = await send_message.react('❌');
    
    const filter_close_quest = await ((reaction,user) => reaction.emoji.name === '❌' && !user.bot);
    const filter_help = await ((reaction,user) => reaction.emoji.name === '✅' && !user.bot && message.author.id!=user.id)

  send_message.awaitReactions(filter_close_quest, { max: 1,time: 3600000}).then(async (err,collected) => {
        if(err)
            return console.log(err)
        if(ask){
            help_await.setDescription(`${message.author} отменил запрос о помощи.`);
            ticket.reactions.removeAll();
            ticket.edit(help_await);
        }
        send_message.delete();
       quest.setDescription(`Вы отменили запрос на помощь, следующий запрос возможен через 10 минут.`);
       message.author.send(quest);
    
       active_chat.findOne({
        id_person: message.author.id,
        id_guild: guild_id
    }, async (err,active_chats) =>{
        if(err)
            return console.log(err)
        if(active_chats) {
            active_chats.active_help = false
            active_chats.last_message=Date.now();
        }
        active_chats.save()
    })}).catch(async (err,collected)=>{
        if(err)
            return console.log(err)
        if(!ask) {
            send_message.delete();
            quest.setDescription(`Время вышло. Вы не описали ваш вопрос, поэтому ваш запрос был отменен автоматически, если у вас осталась надобность в помощи, напишите команду c запросом заново.`);
            message.author.send(quest);
            active_chat.findOne({
                id_person: message.author.id,
                id_guild: guild_id
            }, async (err,active_chats) =>{
                if(err)
                    return console.log(err)
                if(active_chats)
                {
                    active_chats.active_help = false
                }
                active_chats.save()
            })
        }
    })
    
    const filter = m => !m.author.bot;
    const collector = send_message.channel.createMessageCollector(filter, { idle: 3600000 });
    collector.on('collect', async (msg) => {
        switch(i) {
            case 0:
                i+=1;
                quest.setDescription(`Ваш вопрос записан, ожидайте ответа агента технической поддержки.`)
                new_help_message = msg.content;
                message_saved = await message.author.send(quest);
                help_await = new Discord.MessageEmbed().setTitle(`Support Agency`).setDescription(`${message.author}: ${new_help_message}\nЧтобы принять вызов нажмите на реакцию ✅`);
                ticket = await chat.send(help_await);
                await ticket.react('✅')
                console.log(1)
                console.log(query.find(element => element.id_person === "498159319435575297"))
                open1(ticket)
                break;
            case 1:
                if(ask){
                    quest_chat_msg.setDescription(`${msg.author}: ${msg.content}`)
                    helper.send(quest_chat_msg)
                    if(msg.attachments.array().length!=0)
                        helper.send({files: [msg.attachments.array()[0].attachment]})
                }
                break;
        }
    });
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

}

    async function open(collected) {
        console.log(2)
        await collected.array()[0].users.cache.forEach(async function(elem) {
            collected.array()[0].remove(elem);
            helper = elem
           })
          ask = true;
          send_message.delete();
          help_await.setDescription(`${helper} принял вызов.\n\n${message.author}: ${new_help_message}`);
          let new_help_messages = new Discord.MessageEmbed().setTitle(`Support Agency`).setDescription(`${helper} принял вашу просьбу о помощи.\nОжидайте ответ.`);
          await message.author.send(new_help_messages)                  
          ticket.edit(help_await);
          new_help_messages.setDescription(`${message.author}: ${new_help_message}\nПомогите ему, ваши ответы передаются ${message.author} через ${bot.user}.`)
          let sended_help = await helper.send(new_help_messages)
    
          query = active_chat.findOne({
             id_person: helper.id,
             id_guild: guild_id
         }, async (err,active_chats) =>{
             if(err)
                 return console.log(err)
             if(!active_chats){
                 const NewActive = new active_chat({
                     id_person: helper.id,
                     id_guild: guild_id,
                     active_help: true,
                     last_message: Date.now()
                 })
                 NewActive.save()
             }    
             else {
                 active_chats.active_help = true
                 active_chats.last_message=Date.now();
                 active_chats.save()
             }
         })
          const filter_helper = m => !m.author.bot;                  
          const collector_help = sended_help.channel.createMessageCollector(filter_helper, { idle: 3600000 });
          collector_help.on('collect', async (msg1) => {
             helper_chat_msg.setDescription(`${helper}: ${msg1.content}`)
             message.author.send(helper_chat_msg)
             if(msg.attachments.array().length!=0)
                 message.author.send({files: [msg1.attachments.array()[0].attachment]})
          })
    }
    async function open1(ticket) {
        console.log(ticket)
        const filter_react = (reaction,user) => !user.bot && message.author.id!=user.id && reaction.emoji.name === '✅'
        await ticket.awaitReactions(filter_react, { max: 1,time: 3600000}).then(async collected => {
            activits=false
            open();
            console.log(collected)//.value.users.cache.array()[collected.array()[0].value.users.cache.length-1])
           })/*.catch(async collected=>{
            help_await.setDescription(`Время на прием запроса о помощи вышел.`)
            quest.setDescription(`К сожалению на ваш запрос о просьбе никто не откликнулся, попробуйте отправить запрос еще раз, если вам до сих пор требуется помощь.`)
            sended_message.edit(quest);
            ticket.edit(help_await)
            ticket.reactions.removeAll()
            active_chat.findOne({
                id_person: message.author.id,
                id_guild: guild_id
            }, async (err,active_chats) =>{
                if(err)
                    return console.log(err)
                if(active_chats) {
                    active_chats.active_help = false
                }
                active_chats.save()
            })
            });*/
    }

}
module.exports.help = {
    name: "help"
}