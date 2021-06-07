const { Client } = require("discord.js")
const Discord = require("discord.js")

class KriveManager extends Client {

    constructor(clientOptions) {
        super(clientOptions);
        // texts

        // general info

        this.url = "https://krivebot.xyz"
        this.discord = "https://krivebot.xyz/discord"
        this.botname = `KriveBot`
        this.latestupdate = `USERS & ECONOMY UPDATE`
        this.twitter = "https://krivebot.xyz/twitter"
        this.youtube = "https://krivebot.xyz/youtube"
        this.statuspage = "https://status.krivebot.xyz"

        // version

        this.version = "v3.8"
        this.moderationVersion = "v1.5"
        this.setVersion = "v2.0"

        // otherlinks

        this.docsLink = "docs.krivebot.xyz"
        this.statusLink = "status.krivebot.xyz"

        // footers

        this.footer = `${this.botname} ${this.version} || ${this.discord}`
        this.moderationFooter = `${this.botname} moderacja ${this.moderationVersion}`
        this.setFooter = `${this.botname} ustawienia ${this.setVersion} || w wersji bota v4.0 ustawienia przejdą kompletną przebudowę i zostaną globalnie zresetowane.`
    }
   authorSender (message, title, text, footer, color, fields = [], image) {
        const authorSenderEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(text)
            .setColor(color)
            .setFooter(footer)
            .setImage(image)
        if (fields.length) authorSenderEmbed.addFields(fields)

        return message.author.send(authorSenderEmbed).catch(err => {
            this.sender(message, "400: Bad request", "Nie mogliśmy wysłać powiadomienia użytkownikowi na prywatną wiadomość, ponieważ posiada zablokowane DM.", "Ta wiadomość zostanie usunięta za 1 minutę", "RED", "", "").then(h => {
                h.delete({timeout: 60000})
            })
        })
    }
    sender (message, title, text, footer, color, fields = [], image) {
        const senderEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(text)
            .setColor(color)
            .setFooter(footer)
            .setImage(image)
        if (fields.length) senderEmbed.addFields(fields);
        return message.channel.send(senderEmbed)
    }
}
module.exports = KriveManager;