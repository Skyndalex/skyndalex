const { Client } = require("discord.js-light")
const Discord = require("discord.js-light")
class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v3.0"
        this.url = "https://krivebot.xyz"
        this.discord = "https://discord.gg/m6N8mnCBWv"
        this.footer = `KriveBot ${this.version} || ${this.discord}`
    }
    //TODO: fields
    async embed(message, title, text, footer = this.footer, color = "GREEN") {
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(title)
            .setDescription(text)
            .setColor(color)
            .setFooter(this.footer)

        return message.channel.send(embed)
    }
}
module.exports = KriveManager;