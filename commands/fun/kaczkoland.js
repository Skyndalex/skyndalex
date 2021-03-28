const Discord = require("discord.js-light")
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.errorBuilder(message, `Nie podano gracza!`)

    fetch("https://api.kaczkoland.pl/all")
        .then(res => res.json())
        .then(req => {
            const r = req.find(q => q.username === args[0]);
            if (!r) return client.errorBuilder(message, `Nie znaleziono gracza!`)

            let embedStats = new Discord.MessageEmbed()
                .setTitle(`Statystyki gracza na serwerze kaczkoland.pl`)
                .setDescription(`Nazwa gracza: ${r.username} (UUID: ${r.uuid})`)
                .addField("Ranga", r.primary_rank)
                .addField("Wysłanych wiadomości", r.sent_messages)
                .addField("Zwalczonych cm", r.walked_cm)
                .addField("Stan konta", r.money)
                .addField("Scraftowanych itemów", r.crafted_items)
                .addField("Położonych bloków", r.placed_blocks)
                .addField("Śmierci", r.deaths)
                .addField("Wykopanych diamentów", r.mined_diamonds)
                .addField("Wykopanych bloków", r.mined_blocks)
                .addField("Zabitych mobów", r.mob_kills)
                .setColor("GREEN")
            message.channel.send(embedStats)
        })
}
exports.help = {
    name: "kaczkoland",
    description: "Sprawdza statystyki gracza na serwerze minecraft kaczkoland.pl",
    category: "fun",
    aliases: ["serwerkaczkoland"]
}