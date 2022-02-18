const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    const table = await r.table("settings").get(member.guild.id).run(client.con);

    const embed = new MessageEmbed()
        .setDescription(`**Właśnie ktoś wyszedł!**\n\nŹegnamy użytkownika ${member.user}(${member.user.tag})[${member.user.id}]\nAktualna ilość osób na serwerze: \`[${member.guild.memberCount}]\``)
        .setColor("RED")
    if (table?.goodbyeChannel) member.guild.channels.cache.get(table.welcomeChannel).send({ embeds: [embed] })
}