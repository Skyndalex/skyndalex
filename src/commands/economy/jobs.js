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
        const table = await r.table("economy").get(interaction.user.id).run(client.con)

        if (interaction.options.getString("job") === "developer") {
            if (table?.job) return interaction.reply({content: "Jesteś już w pracy!", ephemeral: true})
            await r.table("economy").insert({ userid: interaction.user.id, money: 0, job: "developer" }).run(client.con)

            client.builder(interaction, ``, `**Dołączono do pracy**\n\nUżytkownik: ${interaction.user.tag}\nPraca: Programista`, `Ekonomia`, `GREEN`)
        } else if (interaction.options.getString("job") === "miner") {
            if (table?.job) return interaction.reply({content: "Jesteś już w pracy!", ephemeral: true})
            await r.table("economy").insert({ userid: interaction.user.id, money: 0, job: "miner"}).run(client.con)

            client.builder(interaction, ``, `**Dołączono do pracy**\n\nUżytkownik: ${interaction.user.tag}\nPraca: Górnik`, `Ekonomia`, `GREEN`)
        }
    }

};
