 const r = require('rethinkdb')
const Discord = require("discord.js")
module.exports = async (client, member) => {
        try {
            const role = await r.table('settings').get(member.guild.id)("autoRole").default("842125685354659921").run(client.con)
            member.roles.add(role)

            const channel = await r.table('settings').get(member.guild.id)("welcomeChannel").default(null).run(client.con)
            /*
                const wTitle = await r.table("settings").get(member.guild.id)("welcomeTextTitle").run(client.con)
                const wDesc = await r.table("settings").get(member.guild.id)("welcomeTextDesc").run(client.con)
                const wFooter = await r.table("settings").get(member.guild.id)("welcomeTextFooter").run(client.con)
                const wColor = await r.table("settings").get(member.guild.id)("welcomeColorHex").run(client.con)
             */
            const embed = new Discord.MessageEmbed()
                .setTitle("Ktoś wszedł!")
                .setDescription(`Witamy, ${member.user}! Mamy nadzieję, ze będziesz się u nas dobrze bawił. Jest nas już ${member.guild.memberCount}!`)
                .setColor("GREEN")
            member.guild.channels.cache.get(channel).send(embed)
        } catch {
            null;
        }
}