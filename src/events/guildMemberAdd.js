const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "guildMemberAdd",
    once: false,

    async execute(client, member) {
        const table = await r.table("settings").get(member.guild.id).run(client.con);
        const table2 = await r.table("users").get(member.user.id).run(client.con);

        const embed = new MessageEmbed()
        .setDescription(`**Właśnie ktoś wszedł!**\n\nWitamy użytkownika ${member.user}(${member.user.tag})! Mamy nadzieję że się będziesz dobrze u nas bawił.\nAktualna ilość osób na serwerze: ${member.guild.memberCount}`)
        .setColor("GREEN")
        member.guild.channels.cache.get(table.welcomeChannel).send({
            embeds: [embed]
        })

        if (table2?.isMuted) {
            await member.roles.add(table?.mutedRole)
        };
        if (table?.autoRole) {
            await member.roles.add(table?.autoRole)
        };
    }
}