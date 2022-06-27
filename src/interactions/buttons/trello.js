const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed, Modal, MessageActionRow, MessageButton } = require("discord.js");
const { fetch } = require("undici")
exports.run = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);
    const { authURL } = require("../../config.json").discord;

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(authURL)
                .setLabel("You can authorize here")
                .setStyle("LINK")
        )

    if (!db?.key || !db?.token) return interaction.reply({ content: "You are not authorized!", components: [row], ephemeral: true });

    switch (interaction.customId) {
        case "trello_add_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let addCardString = interaction.message.embeds[0]

            const cardName = addCardString.fields[0].value
            const cardDesc = addCardString.fields[0].value
            const listID = addCardString.fields[2].value

            const cardAdd = await fetch(`https://api.trello.com/1/cards?idList=${listID}&key=${db.key}&token=${db.token}&name=${cardName}&desc=${cardDesc}`,
                { method: "POST" }
            );
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

           // console.log(addedAttachmentToCard)

            await interaction.reply("OK")
            break;
        case "board_add_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let boardAddString = interaction.message.embeds[0];

            let bName = boardAddString.fields[0].value;
            let organizationID = boardAddString.fields[1].value;
            let description = boardAddString.fields[2].value;

            const addBoard = await fetch(`https://api.trello.com/1/boards/?name=${bName}&key=${db.key}&token=${db.token}&idOrganization=${organizationID}&desc=${description}`,
                { method: "POST" }
            )
            const addedBoard = addBoard.json()
           // console.log(addedBoard)

            await interaction.reply("OK")

            break;
        case "add_checklist_confirm":
            if (interaction.message.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            let addChecklistString = interaction.message.embeds[0];

            let cardID2 = addChecklistString.fields[0].value;
            let checklistName = addChecklistString.fields[1].value;

            const addChecklist = await fetch(`https://api.trello.com/1/checklists?idCard=${cardID2}&key=${db.key}&token=${db.token}&name=${checklistName}`,
                { method: "POST" }
            )

            const addedChecklist = await addChecklist.json()

            let addedChecklistSuccess = new MessageEmbed()
                .setDescription(`\`[${addedChecklist.name}]\` successfully added checklist`)
                .setColor("DARK_BUT_NOT_BLACK")
            interaction.reply({ embeds: [addedChecklistSuccess] })
            break;
        case "add_comment_confirm":
            let addCommentString = interaction.message.embeds[0];

            let cardID3 = addCommentString.fields[0].value;
            let commentDescription = addCommentString.fields[1].value;

            const addComment = await fetch(`https://api.trello.com/1/cards/${cardID3}/actions/comments?text=${commentDescription}&key=${db.key}&token=${db.token}`,
                { method: "POST" }
            )
            const addedComment = await addComment.json()
            console.log(addedComment)

            let addedCommentSuccess = new MessageEmbed()
                .setDescription(`\`[${addedComment.data.text}]\` successfully added comment to card **${addedComment.data.card.name}**`)
                .setColor("DARK_BUT_NOT_BLACK")
            interaction.reply({ embeds: [addedCommentSuccess] })
            break;

    }
}