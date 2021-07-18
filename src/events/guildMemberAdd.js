const r = require("rethinkdb")
const Discord = require("discord.js")
module.exports = async(client, member) => { 
    const g = await r.table("settings").get(member.guild.id).run(client.con)

    const welcomeChannel = await r.table("settings").get(member.guild.id)("welcomeChannel").run(client.con)
        if (!g.welcomeChannelActivate) return

        const autorole = await r.table("autorole").get(member.guild.id).run(client.con)
        if (!autorole?.activate) return

        member.roles.add(autorole.role)   

        const embed = new Discord.MessageEmbed()
        .setTitle("Witamy nowego użytkownika!")
        .setDescription(`Witamy, ${member.user}! Mamy nadzieję, że jak najlepiej tu się rozgościsz.`)
        .setColor("GREEN")
        member.guild.channels.cache.get(welcomeChannel).send(embed)    
 
}