const r = require('rethinkdb')
const Discord = require("discord.js")
module.exports = async (client, member) => {
    const role = await r.table('settings').get(member.guild.id)("autoRole").run(client.con)
    member.roles.add(role)


    const channel = await r.table('settings').get(member.guild.id)("welcomeChannel").run(client.con)

    const wTitle = await r.table("settings").get(member.guild.id)("welcomeTextTitle").run(client.con)
    const wDesc = await r.table("settings").get(member.guild.id)("welcomeTextDesc").run(client.con)
    const wFooter = await r.table("settings").get(member.guild.id)("welcomeTextFooter").run(client.con)

    const embed = new Discord.MessageEmbed()
        .setTitle(wTitle)
        .setDescription(wDesc)
        .setFooter(wFooter)
        .setColor("GREEN")
    member.guild.channels.cache.get(channel).send(embed)
}