const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "application",
    description: "Send application.",

    run: async (client, interaction) => {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.applicaitonsChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        const embed = new MessageEmbed()
            .setTitle("New applicaton!")
            .setDescription(`\`${interaction.options.getString("arguments")}\``)
            .setColor(`DARK_BUT_NOT_BLACK`)
            .setTimestamp()
        await client.channels.cache.get(data?.applicaitonsChannel).send({embeds: [embed]});

        interaction.reply({content: "Success!", ephemeral: true});
    }

};