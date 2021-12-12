const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    once: false,

    async execute(client, member) {
        const table = await r.table("settings").get(member.guild.id).run(client.con);
        if (!table?.welcomeChannel) return;

        let embed = new MessageEmbed()
            .setTitle(`User joined!`)
            .setDescription(`Welcome ${member.user.tag}! there are ${member.guild.memberCount} people on the server `)
            .setColor("GREEN")
        await member.guild.channels.cache.get(table.welcomeChannel).send({ embeds: [embed]})
    }
}