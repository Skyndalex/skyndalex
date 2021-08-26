const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "guildMemberRemove",
    once: false,

    async execute(client, member) {
        const table = await r.table("settings").get(member.guild.id).run(client.con)
        
        const embed = new MessageEmbed()
        .setDescription(`**Właśnie ktoś wyszedł**\n\nŻegnamy użytkownika ${member.user.tag}... Mamy nadzieję, że kiedyś do nas wrócisz ~~no chyba że masz bana.~~\nPozostało osób: ${member.guild.memberCount}`)
        .setColor("RED")
        member.guild.channels.cache.get(table.goodbyeChannel).send({
            embeds: [embed]
        })
    }
}