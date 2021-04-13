const { Client } = require("discord.js")
const Discord = require("discord.js")

class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v3.0"
        this.url = "https://krivebot.xyz"
        this.discord = "https://discord.gg/m6N8mnCBWv"
        this.footer = `KriveBot ${this.version} || ${this.discord}`
        this.botname = `KriveBot`
        this.latestupdate = `USERS & ECONOMY UPDATE`

        this.docsLink = "docs.krivebot.xyz"
        this.channelConfigLinkDocs = "docs.krivebot.xyz/pl/channel-config"
        this.autoRoleConfigLinkDocs = "docs.krivebot.xyz/pl/autorole"
        this.verificationConfigLinkDocs = "docs.krivebot.xyz/pl/verification"
        this.moneyCollectingLinkDocs = "docs.krivebot.xyz/pl/acquisition-money"
        this.chancesLinkDocs = "docs.krivebot.xyz/pl/chances"
    }
     error(message, text, footer = "Błąd", color = "RED") {
        let embedError = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Błąd!`)
            .setDescription(text)
            .setColor(color)
            .setFooter(this.footer)
        return message.channel.send(embedError)
    }
}
module.exports = KriveManager;