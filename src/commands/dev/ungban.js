const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ungban",
    description: "Ungban member.",

    run: async (client, interaction) => {
        let dev = ["817883855310684180"];
        if (!dev.includes(message.author.id)) return message.reply(client.strings.dev.error_permissions);

        let userID = await interaction.options.getString("userid");

        await r.table("gbans").update({ gban: false }).run(client.con);

        const embed = new MessageEmbed()
            .setDescription(`User ID: ${interaction.options.getString("userid")}\ngban: **false**`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
};