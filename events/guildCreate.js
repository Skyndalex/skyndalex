const r = require("rethinkdb")
module.exports = async(client, guild) => {
   await r.table("settings").insert({
        guildID: guild.id
    }).run(client.con)
}