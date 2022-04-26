const { SlashCommandBuilder } = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addSubcommand(subcommand =>
            subcommand
                .setName("addcard")
                .setDescription("Add card")
                .addStringOption(option => option.setName("name").setDescription("Card name").setRequired(true))
                .addStringOption(option => option.setName("description").setDescription("Card description").setRequired(true))
                .addStringOption(option => option.setName("listid").setDescription("List ID").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("auth")
                .setDescription("Auth")
                .addStringOption(option => option.setName("key").setDescription("Key").setRequired(true))
                .addStringOption(option => option.setName("token").setDescription("token").setRequired(true))
        ),

    async execute(client, interaction) {
        const db = await r.table("trello").get(interaction.user.id).run(client.con);
        const trelloClient = new Trello(db.key, db.token);

        let cardName = await interaction.options.getString("name");
        let cardDescription = await interaction.options.getString("description");
        let listId = await interaction.options.getString("listid");

        switch (interaction.options.getSubcommand()) {
            case "addcard":
                await trelloClient.addCard(cardName, cardDescription, listId, async function (error, trelloCard) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('Added card:', trelloCard);

                        let embed = new MessageEmbed()
                            .setDescription(`\`[${trelloCard.name}]\` Successfully added to list [ID: [\`${trelloCard.id}\`](${trelloCard.shortUrl})]`)
                            .setColor("DARK_BUT_NOT_BLACK")
                        await interaction.reply({ embeds: [embed] })
                    }
                })
                break;
            case "auth":
                await r.table("trello").insert({ uid: interaction.user.id, key: interaction.options.getString("key"), token: interaction.options.getString("token") }, { conflict: "update" }).run(client.con)

                await interaction.reply({ content: `Your key and token successfully added to database.\n\nToken: ${interaction.options.getString("token")}\nKey: ${interaction.options.getString("key")}`, ephemeral: true})
                break;
        }
    }
}