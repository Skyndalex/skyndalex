const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    name: "complaint",
    description: "Send complaint.",

    run: async (client, interaction) => {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.complaintsChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        let user = interaction.options.getUser("user");

        const embed = new MessageEmbed()
            .setTitle("New complaint")
            .addField(`By`, `${interaction.user.tag}(${interaction.user.id})`)
            .addField(`User reported`, `${user}(${user.id})`)
            .addField(`Reason`, `${interaction.options.getString("reason") || "None"}`)
            .setColor("DARK_BUT_NOT_BLACK")
        await client.channels.cache.get(data?.complaintsChannel).send({embeds: [embed]}).then(async message => {
            await message.startThread({
                name: 'Complaint discussion.',
                autoArchiveDuration: 1440, // hours
                reason: client.strings.tools.thread_reason,
            })
        })
        interaction.reply({content: "Success!", ephemeral: true})
    }
};