const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "suggest",
    description: "Send suggestion",

    run: async (client, interaction) => {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.suggestionsChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        const embed = new MessageEmbed()
            .setDescription(`\`${interaction.options.getString("arguments")}\``)
            .setFooter(`Suggestion posted by: ${interaction.user.tag} (${interaction.user.id})`)
            .setColor("DARK_BUT_NOT_BLACK")
        await client.channels.cache.get(data?.suggestionsChannel).send({embeds: [embed]}).then(async message => {
            await message.startThread({
                name: 'Suggestion discussion.',
                autoArchiveDuration: 1440,
                reason: client.strings.tools.thread_reason
            })
        })

        interaction.reply({content: "Success!", ephemeral: true})
    }
};