const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async(client, member) => {
    try {
        const channel = await r.table('settings').get(member.guild.id)("goodbyeChannel").default(null).run(client.con)

        const embed = new Discord.MessageEmbed()
            .setTitle("Ktoś wyszedł")
            .setDescription(`Żegnaj, ${member.user.tag}. Mamy nadzieję że kiedyś do nas wrócisz`)
            .setColor("RED")
        member.guild.channels.cache.get(channel).send(embed)
    } catch {
        null
    }

}