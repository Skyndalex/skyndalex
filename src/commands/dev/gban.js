const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "gban",
    description: "Gban member.",

    run: async (client, interaction) => {
        let dev = ["817883855310684180"];
        if (!dev.includes(message.author.id)) return interaction.reply(client.strings.dev.error_permissions);

        let userID = await interaction.options.getString("userid");

        await r.table("gbans").insert({ uid: userID, gban: true }, { conflict: 'update' }).run(client.con);

        const embed = new MessageEmbed()
            .setDescription(`User ID: ${interaction.options.getString("userid")}\ngban: **true**`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
}
