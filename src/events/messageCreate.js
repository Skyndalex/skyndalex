const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageCreate",
    once: false,

    async execute (client, message) {
        const prefixMention = new RegExp(`^<@!?${client.user.id}>(|)$`);

        const mention = new MessageEmbed()
            .setDescription(`Documentation: [Link](https://docs.krivebot.xyz)\nPrefix: \`/\``)
            .setColor("DARK_BUT_NOT_BLACK")
        if (message.content.match(prefixMention)) {
            return message.channel.send({embeds: [mention]});
        };
    }
}