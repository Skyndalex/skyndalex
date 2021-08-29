const fetch = require("node-fetch")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender("Błąd: 404. Not found.", "Nie znaleziono gracza na serwerze kaczkoland.pl", "", "RED", "", "")

    fetch("https://api.kaczkoland.pl/all")
        .then(res => res.json())
        .then(req => {
            const r = req.find(q => q.username === args[0]);
            if (!r) return client.sender(message, "Błąd", "Nie znaleziono gracza na tej edycji kaczkolandu.", "", "GREEN", "", "")
            const embed = new MessageEmbed()
                .setDescription(`Kaczkoland.pl > Statystyki gracza ${r.username}\nKaczkoland.pl > Serwer minecraft survival + działki 1.17.1 [Strona](https://kaczkoland.pl)\n\n**Nazwa gracza** - ${r.username}\n\n**Zabitych graczy** - ${r.player_kills}\n\n**Śmierci** - ${r.deaths}\n\n**Zabitych mobów** - ${r.mob_kills}\n\n**Wykopanych bloków** - ${r.mined_blocks}\n\n**Wykopanych diamentów** - ${r.mined_diamonds}\n\n**Scraftowanych itemów** - ${r.crafted_items}`)
                .setColor("#17ffec")
            message.channel.send({ embeds: [embed]})
        })
}
exports.help = {
    name: "kaczkoland",
    description: "Sprawdza statystyki gracza na serwerze minecraft kaczkoland.pl",
    category: "fun",
    aliases: ["serwerkaczkoland"]
}