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
            let addCardString = interaction.message.embeds[0]

            const cardName = addCardString.fields[0].value
            const cardDesc = addCardString.fields[0].value
            const listID = addCardString.fields[2].value

            const res = await fetch(`https://api.trello.com/1/cards?idList=${listID}&key=${db.key}&token=${db.token}&name=${cardName}&description=${cardDesc}`, {
                method: "POST"
            })
            const json = await res.json()
            console.log(json)

            let embedSuccessful = new MessageEmbed()
                .setDescription(`\`[${json.name}]\` successfully added to trello list: **[${json.id}](${json.idList})**`)
                .setColor("DARK_BUT_NOT_BLACK")
            interaction.reply({ embeds: [embedSuccessful] })
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