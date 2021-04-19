const { Client } = require("discord.js")
const Discord = require("discord.js")

class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);
        // general info
        this.url = "https://krivebot.xyz"
        this.discord = "https://discord.gg/m6N8mnCBWv"
        this.botname = `KriveBot`
        this.latestupdate = `USERS & ECONOMY UPDATE`

        // version

        this.economyVersion = "0.8"
        this.musicVersion = "0.5"
        this.version = "v3.0"

        // otherlinks

        this.docsLink = "docs.krivebot.xyz"
        this.statusLink = "status.krivebot.xyz"

        //docsLinks (None)

        // footers

        this.footer = `${this.botname} ${this.version} || ${this.discord}`
        this.economyFooter = `${this.botname} ekonomia ${this.economyVersion}`
        this.musicFooter = `${this.botname} muzyka ${this.musicVersion}`
    }

    error(message, text, footer = "Błąd", color = "RED") {
        let embedError = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Błąd!`)
            .setDescription(text)
            .setColor(color)
            .setFooter(this.footer)
        return message.channel.send(embedError)
    }
}
module.exports = KriveManager;