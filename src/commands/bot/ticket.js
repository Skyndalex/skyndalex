const cooldown = new Set;
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ticket",
    description: "send us a bug",
    options: [{ type: "STRING", name: "message", description: "Your content", required: true }],

    run: async (client, interaction) => {
        if (cooldown.has(interaction.user.id)) {
            interaction.reply({content: "Please wait a few seconds before using this command again", ephemeral: true})
        } else {
            const channel = client.channels.cache.get("898987983913508915");

            const embed = new MessageEmbed()
                .setTimestamp()
                .setTitle("New ticket")
                .addField("Author", interaction.user.tag)
                .addField("Content", interaction.options.getString("message"))
                .setFooter(`User ID: ${interaction.user.id}`)
                .setColor("DARK_BUT_NOT_BLACK")
            channel.send({ embeds: [embed] }).then(message => {
                message.startThread({ name: "resolving ticket", autoArchiveDuration: 1440, reason: "New ticket"})
            });

            interaction.reply("The ticket has been sent!")
        }
        cooldown.add(interaction.user.id);
        setTimeout(() => cooldown.delete(interaction.user.id), 5000);
    }

}
