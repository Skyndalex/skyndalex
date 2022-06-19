const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");
const { fetch } = require("undici")
exports.run = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);
    const { authURL } = require("../../config.json").discord;

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(authURL)
                .setLabel("Authorize")
                .setStyle("LINK")
        )

    if (!db?.key || !db?.token) return interaction.reply({ content: "You are not authorized!", components: [row], ephemeral: true });

    let manager = new Trello(db?.key, db?.token);

    switch (interaction.customId) {
        case "trello_add_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let addCardString = interaction.message.embeds[0]

            const cardName = addCardString.fields[0].value
            const cardDesc = addCardString.fields[0].value
            const listID = addCardString.fields[2].value

            const cardAdd = await fetch(`https://api.trello.com/1/cards?idList=${listID}&key=${db.key}&token=${db.token}&name=${cardName}&description=${cardDesc}`, {
                method: "POST"
            });
            const cardAddedData = await cardAdd.json()

            // console.log(json)

            let embedSuccessful = new MessageEmbed()
                .setDescription(`\`[${cardAddedData.name}]\` successfully added to trello list: **[${cardAddedData.id}](${cardAddedData.idList})**`)
                .setColor("DARK_BUT_NOT_BLACK")
            interaction.reply({ embeds: [embedSuccessful] })
            break;
        case "trello_add_attach_to_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let addAttachmentToCardString = interaction.message.embeds[0]

            const cardID = addAttachmentToCardString.fields[0].value;
            const imageURL = addAttachmentToCardString.fields[1].value;


            const addAttachmentToCard = await fetch(`https://api.trello.com/1/cards/${cardID}/attachments?key=${db.key}&token=${db.token}&url=${imageURL}`, {
                method: "POST"
            });
            const addedAttachmentToCard = await addAttachmentToCard.json()

            console.log(addedAttachmentToCard)

            await interaction.reply("OK")
            break;
        case "board_add_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let boardAddString = interaction.message.embeds[0];

            let bName = boardAddString.fields[0].value;
            let organizationID = boardAddString.fields[1].value;
            let description = boardAddString.fields[2].value;

            await manager.addBoard(bName, description, organizationID,
                async function (error, addBoard) {
                if (error) {
                    interaction.reply(`\`\`\`${error}\`\`\``)
                } else {
                    let embedSuccessful = new MessageEmbed()
                        .setDescription(`\`[${addBoard.name}]\` Successfully added board to your account`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    await interaction.reply({ embeds: [embedSuccessful] })
                }

            })
            break;
    }
}