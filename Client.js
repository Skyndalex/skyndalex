const { Client } = require("discord.js")
const Discord = require("discord.js")

class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);
        // general info
        this.url = "https://krivebot.xyz"
        this.discord = "https://krivebot.xyz"
        this.botname = `KriveBot`
        this.latestupdate = `USERS & ECONOMY UPDATE`

        // version

        this.economyVersion = "0.8"
        this.musicVersion = "0.5"
        this.version = "v3.0"
        this.moderationVersion = "v1.0"
        this.setVersion = "v1.5"

        // otherlinks

        this.docsLink = "docs.krivebot.xyz"
        this.statusLink = "status.krivebot.xyz"

        //docsLinks (None)

        // footers

        this.footer = `${this.botname} ${this.version} || ${this.discord}`
        this.economyFooter = `${this.botname} ekonomia ${this.economyVersion}`
        this.musicFooter = `${this.botname} muzyka ${this.musicVersion}`
        this.moderationFooter = `${this.botname} moderacja ${this.moderationVersion}`
        this.setFooter = `${this.botname} ustawienia ${this.setVersion} || w wersji bota v4.0 ustawienia przejdą kompletną przebudowę i zostaną globalnie zresetowane.`

        // messages

        this.off1Message = "Ups! Komenda **vctempban** jest niedostępna bądź pozostanie przeniesiona do wersji bota 4.0! Prosimy o cierpliwość"
        this.off2Message = "Ups! Komenda **vctempmute** jest niedostepna bądź pozostanie przeniesiona do wersji bota 4.0! Prosimy o cierpliwość."

        this.disabledMessage1 = "Ups! Komenda **play** jest prywatna i mogą jej użyć tylko wybrani użytkownicy przez administrację bota!"
        this.disabledMessage2 = "Ups! Komenda **stop** jest prywatna i mogą jej użyć tylko wybrani użytkownicy przez administrację bota!"

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