const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDescription('Dołącz do pracy')
        .addStringOption(option => (
            option.setName("job").setDescription("Dołącz do pracy. Wpisz samą komendę aby zobaczyć listę prac.")
                .addChoice("programista", "developer")
                .addChoice("górnik", "miner")
        )),
    async execute(client, interaction) {
        if (interaction.options.getString("job") === "developer") {
            await r.table("economy").insert({ userid: interaction.user.id, money: 0, job: "developer" }).run(client.con)

            client.builder(interaction, ``, `**Dołączono do pracy**\n\nUżytkownik: ${interaction.user.tag}\nPraca: Programista`, `Ekonomia`, `GREEN`)
        } else if (interaction.options.getString("job") === "miner") {
            await r.table("economy").insert({ userid: interaction.user.id, money: 0, job: "miner "}).run(client.con)

            client.builder(interaction, ``, `**Dołączono do pracy**\n\nUżytkownik: ${interaction.user.tag}\nPraca: Górnik`, `Ekonomia`, `GREEN`)
        }
    }

};
