const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "messageCreate",
    once: false,

    async execute (client, message) {
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

        const mention = new MessageEmbed()
            .setTitle("Szukasz pomocy?")
            .setDescription("Bot został przepisany na slash-komendy [Zobacz dlaczego](https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Access-Deprecation-for-Verified-Bots)\n.Jeśli nie widzisz komend bota po ukośniku (/) [dodaj bota jeszcze raz](https://krivebot.xyz/invite) aby włączyć komendy.")
            .setColor("ORANGE")
            .setTimestamp()
        if (message.content.match(prefixMention)) {
            return message.reply({embeds: [mention], ephemeral: true})
        }
    }
}