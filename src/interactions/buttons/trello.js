const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");
exports.run = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);
    if (!db?.key) interaction.reply("Invalid trello account key!\nAuthorize: \`/trello auth\`");
    if (!db?.token) interaction.reply("Invalid trello application token!\nAuthorize: \`/trello auth\`");

    let manager = new Trello(db.key, db.token);

    switch (interaction.customId) {
        case "trello_add_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })
            let addCardString = interaction.message.embeds[0]

            let name = addCardString.fields[0].value;
            let desc = addCardString.fields[1].value;
            let listId = addCardString.fields[2].value;

            await manager.addCard(name, desc, listId,
                async function(error, trelloCard) {
                if (error) {
                    await interaction.reply(`\`\`\`${error}\`\`\``)
                } else {
                    let embedSuccessful = new MessageEmbed()
                        .setDescription(`\`[${name}]\` successfully added to trello list [\`${trelloCard.id}\`](${trelloCard.shortUrl})`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    await interaction.reply({ embeds: [embedSuccessful] })
                }})
            // manager.addAttachmentToCard("", "", "")
            break;
        case "trello_add_attach_to_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let addAttachToCardString = interaction.message.embeds[0];

            let cardID = addAttachToCardString.fields[0].value;
            let imageURL = addAttachToCardString.fields[1].value;

            await manager.addAttachmentToCard(cardID, imageURL,
                async function (error, cardAttach) {
                    if (error) {
                        await interaction.reply(`\`\`\`${error}\`\`\``)
                    } else {
                        let embedSuccessful = new MessageEmbed()
                            .setDescription(`\`[${cardAttach.name}]\` successfully added to trello card \`(bytes: ${cardAttach.bytes})\``)
                            .setColor("DARK_BUT_NOT_BLACK")
                        await interaction.reply({ embeds: [embedSuccessful] })
                    }
                })
            break;
    }
}