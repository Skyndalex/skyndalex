const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bal')
        .setDescription('Sprawdź swój stan konta.'),
    async execute(client, interaction) {
        const table = await r.table("economy").get(interaction.user.id).run(client.con);
        if (!table?.job) return interaction.reply({content: "Nie jesteś w pracy!"});

        let works = {
            miner: "Górnik",
            Developer: "Programista"
        };

        client.builder(interaction, ``, `**Stan konta**\n\nTwoja praca: ${works[table.job] || "Błąd"}\nIlość monet: ${table.money}\nUżytkownik: ${interaction.user.tag}`, `Ekonomia`, `GREEN`)
    }
};
