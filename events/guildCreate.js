const r = require("rethinkdb")
module.exports = async(client, guild) => {

   await r.table("settings").insert({
        id: guild.id
    }).run(client.con)

   await r.table("moderation").insert({
       id: guild.id
   }).run(client.con)
/*
    await r.table("ServerEconomy").insert({
        id: guild.id
    }).run(client.con)

 */

    await r.table("system").insert({
        id: guild.id
    }).run(client.con)
    await r.table("notifications").insert({
        id: guild.id
    }).run(client.con)
}