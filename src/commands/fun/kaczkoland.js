const fetch = require("node-fetch")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kaczkoland')
        .setDescription('Szukaj gracza z serwera kaczkoland.pl')
        .addStringOption(option => (
            option.setName("player").setDescription("Gracz kaczkolandu.").setRequired(true)
        )),

    async execute(client, interaction) {
        const player = interaction.options.getString("player");

        await fetch ("https://api.kaczkoland.pl/all").then(res => res.json())
            .then(req => {
                const r = req.find(q => q.username === player);
                if (!r) return client.builder(interaction, "Błąd", "Nie znaleziono gracza na tej edycji kaczkolandu.", "", "GREEN", "", "")
                const embed = new MessageEmbed()
                    .setDescription(`Kaczkoland.pl > Statystyki gracza ${r.username}\nKaczkoland.pl > Serwer minecraft survival + działki 1.17.1 [Strona](https://kaczkoland.pl)\n\n**Nazwa gracza** - ${r.username}\n\n**Zabitych graczy** - ${r.player_kills}\n\n**Śmierci** - ${r.deaths}\n\n**Zabitych mobów** - ${r.mob_kills}\n\n**Wykopanych bloków** - ${r.mined_blocks}\n\n**Wykopanych diamentów** - ${r.mined_diamonds}\n\n**Scraftowanych itemów** - ${r.crafted_items}`)
                    .setColor("#17ffec")
                interaction.reply({ embeds: [embed]})
            })
    }
};
