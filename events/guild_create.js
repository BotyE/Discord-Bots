const Discord = require("discord.js");

const fs= require("fs");

const config = require("../models/config.js")

const language = require("../models/language.js")

module.exports.run = async (bot,event,mongoose) =>{
    config.findOne({
        id_guild: event.d.id
    }, (err,configurate)=>{

        if(err) return console.log(err)

        if(!configurate)
        {
            const NewConfig = new config({
                guild_name: event.d.name,
                id_guild: event.d.id,
                language: "ru_RU",
                prefix: "==",
                paid_for_time: Date.now()+2592000
            })
            NewConfig.save()
        }
    })
}
module.exports.help = {
    name: "GUILD_CREATE"
}