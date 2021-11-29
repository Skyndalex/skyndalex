const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    once: false,

    async execute(client, member) {
        const table = await r.table("settings").get(member.guild.id).run(client.con);
        if (!table?.goodbyeChannel) return;

        let embed = new MessageEmbed()
            .setTitle(`User left!`)
            .setDescription(`Goodbye ${member.user.tag} :(. There are ${member.guild.memberCount} people on the server `)
            .setColor("RED")
        await member.guild.channels.cache.get(table.goodbyeChannel).send({ embeds: [embed]})
    }
}