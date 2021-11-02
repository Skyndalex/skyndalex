const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageCreate",
    once: false,

    async execute(client, message) {

        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        const mention = new MessageEmbed()
            .setTitle("Hello! I'm Krive!")
            .setDescription(`You can find my commands in \`[/]\`\n\nDiscord support: https://discord.gg/WEas4WFjse\nStatuspage: https://status.krivebot.xyz\nDocumentation: https://docs.krivebot.xyz\nAll GitHub projects: https://github.com/KriveWasTaken/`)
            .setColor("GREEN")
        if (message.content.match(prefixMention)) {
            return message.channel.send({embeds: [mention]})
        }
    }
}