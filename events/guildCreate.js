const r = require("rethinkdb")
module.exports = async(client, guild) => {

   await r.table("settings").insert({
        guildID: guild.id
    }).run(client.con)

   await r.table("moderation").insert({
       guildID: guild.id
   }).run(client.con)

    await r.table("ServerEconomy").insert({
        id: guild.id
    }).run(client.con)
}