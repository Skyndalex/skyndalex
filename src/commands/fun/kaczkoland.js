const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender("Błąd: 404. Not found.", "Nie znaleziono gracza na serwerze kaczkoland.pl", "", "RED", "", "")

    fetch("https://api.kaczkoland.pl/all")
        .then(res => res.json())
        .then(req => {
            const r = req.find(q => q.username === args[0]);
            if (!r) return message.channel.send("Przerwa z dostępem API kaczkolandu (Nie znaleziono gracza)\nReason: API ")

            client.sender(message, "Statystyki gracza na serwerze kaczkoland.pl", `Nazwa gracza: ${r.username} (UUID: ${r.uuid}`, "", "GREEN", [
                {
                    name: "Ranga",
                    value: r.primary_rank
                },
                {
                    name: "Wysłanych wiadomości",
                    value: r.sent_messages
                },
                {
                    name: "Zwalczonych centymetrów",
                    value: r.walked_cm
                },
                {
                    name: "Stan konta",
                    value: r.money
                },
                {
                    name: "Scraftowanych itemów",
                    value: r.crafted_items
                },
                {
                    name: "Położonych bloków",
                    value: r.placed_blocks
                },
                {
                    name: "Śmierci",
                    value: r.deaths
                },
                {
                    name: "Wykopanych diamentów",
                    value: r.mined_diamonds
                },
                {
                    name: "Wykopanych bloków",
                    value: r.mined_blocks
                },
                {
                    name: "Zabitych mobów",
                    value: r.mob_kills
                }
            ])
        })
}
exports.help = {
    name: "kaczkoland",
    description: "Sprawdza statystyki gracza na serwerze minecraft kaczkoland.pl",
    category: "fun",
    aliases: ["serwermc"]
}