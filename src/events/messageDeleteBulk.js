const r = require("rethinkdb")
const Discord = require("discord.js")
const hastebin = require("hastebin")
module.exports = async (client, message) => {
    /*
    const logChannel = await r.table('settings').get(message.map(m=>m)[1].channel.guild.id)("messageDeleteBulkLog").run(client.con)

    hastebin.createPaste(`Deleted ${message.size} messages in channel ${message.map(m => m)[1].channel.name}\n\nList: ${+message.map(m => `Author: ${m.author.tag} (${m.author.id}) Message ID: ${m.id} Content:\\n${m.content}\`).join(\`\\n\`)`)}`, {
        raw: true,
        contentType: "text/plain",
        server: "https://hastebin.com"
    }).then(function (urlToPaste) {})
        .catch(function (requestError) {})
        const embed = new Discord.MessageEmbed()
            .setTitle("Usunięto wiele wiadomości!")
            .addField("Link", "SOON")
            .setColor("GREEN")
    message.guild.channels.cache.get(logChannel).send(embed)
    */
}