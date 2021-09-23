const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mc')
        .setDescription('Szukaj gracza z gry minecraft')
        .addStringOption(option => (
            option.setName("player").setDescription("Gracz minecrafta.").setRequired(true)
        )),

    async execute(client, interaction) {
        const player = await interaction.options.getString("player");

        fetch(`https://api.ashcon.app/mojang/v2/user/${player}`).then(res => res.json())
            .then(json => {
                let data = [];
                for (let i in json.username_history) {
                    data.push(json.username_history[i].username);
                }
                if (!json.username) return interaction.reply({content: "Użytkownik nie ma konta premium bądź w ogóle go nie znaleziono!"});

                client.builder(interaction, `Informacje o koncie minecraft: ${json.username}`, ``, ``, `GREEN`, [
                    {
                        name: "Konto stworzono o:",
                        value: json.created_at||"Nie znaleziono danych: \`created_at\`"
                    },
                    {
                        name: "Nazwa użytkownika",
                        value: json.username||"Nie znaleziono danych: \`username\`"
                    },
                    {
                        name: "UUID",
                        value: json.uuid||"Nie znaleziono danych: \`uuid\`"
                    },
                    {
                        name: "Historia nicków (najstarszy --> najnowszy)",
                        value: `\`\`\`${data.join(" , ")}\`\`\``||"Nie znaleziono danych: \`username_history\`"
                    }
                ])
            })
    }
};
