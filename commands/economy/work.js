const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Pracuj.'),
    async execute(client, interaction) {
        const table = await r.table("economy").get(interaction.user.id).run(client.con)
        if (!table?.job) return interaction.reply({content: "Nie jesteś w pracy!"})

        switch (table?.job) {
            case "developer":
                let developerMoney = (Math.floor(Math.random() * (150 - 0)))

                client.builder(interaction, ``, `Twoja praca: **Programista**\n\nOtrzymano łącznie ${developerMoney} monet!`, `Ekonomia`, `GREEN`, ``, ``, ``)

                await r.table("economy").update({ money: table.money + developerMoney }).run(client.con)
            break;
            case "miner":
                let minerMoney = (Math.floor(Math.random() * (100 - 0)))

                client.builder(interaction, ``, `Twoja praca: **Górnik**\n\nOtrzymano łącznie ${minerMoney} monet!`, `Ekonomia`, `GREEN`, ``, ``, ``)

                await r.table("economy").update({money: table.money + minerMoney}).run(client.con)
            break;
        }
    }

};
