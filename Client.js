const { Client } = require("discord.js-light")
const Discord = require("discord.js-light")

class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v2.0"
        this.url = "https://krivebot.xyz"
        this.discord = "https://discord.gg/m6N8mnCBWv"
        this.footer = `KriveBot ${this.version} || ${this.discord}`

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