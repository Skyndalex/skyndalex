const { Client } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
class KriveManager extends Client {

    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v4.0 BETA p2"
        this.url = "https://krivebot.xyz/"
        this.statusLink = "https://status.krivebot.xyz"
        this.docsLink = "https://docs.krivebot.xyz"
        this.set = "KriveBot → Ustawienia"
       
        this.tof = {
            true: "Tak",
            false: "Nie"
        }
        this.types = {
        text: "Kanał tekstowy",
    	voice: "Kanał głosowy",
	    news: "Kanał ogłoszeniowy",
	    store: "Sklep",
	    unknown: "Nieznany typ",
	    stage: "Kanał eventowy"
        }
        this.presences = {
            online: "Dostępny",
            offline: "Niedostępny",
            idle: "Zaraz wracam",
            dnd: "Nie przeszkadzać"
        }
    }

    sender (message, title, text, footer, color, fields = [], image) {
        const senderEmbed = new MessageEmbed()
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