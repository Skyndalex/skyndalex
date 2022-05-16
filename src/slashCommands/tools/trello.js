const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const {MessageEmbed, Modal, MessageActionRow, MessageButton, TextInputComponent} = require("discord.js");
const { showModal } = require("../../utils/modals");

module.exports = { // TODO: remove sub commands and rewrite to choices.
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addSubcommand(subcommand =>
            subcommand
                .setName("auth")
                .setDescription("Trello account authentication")
                .addStringOption(option => option.setName("key").setDescription("Account key").setRequired(true))
                .addStringOption(option => option.setName("token").setDescription("Application token").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("options")
                .setDescription("Trello settings")
                .addStringOption(option => option.setName("add").setDescription("Add options")
                    .addChoices(
                        { name: 'addCard', value: 'add_card_choice' },
                        { name: 'addAttachmentToCard', value: 'add_attach_to_card' },
                        { name: 'addBoard', value: 'add_board' },
                        { name: 'addCardWithExtraParams', value: 'add_card_with_extra_params' },
                        { name: 'addChecklistToCard', value: 'add_checklist_to_card' },
                        { name: 'addCommentToCard', value: 'add_comment_to_card' },
                        { name: 'addCustomField', value: 'add_custom_field' },
                        { name: 'addDueDateToCard', value: 'add_due_date_to_card' },
                        { name: 'addExistingChecklistToCard', value: 'add_existing_checklist_to_card' },
                        { name: 'addItemToChecklist', value: 'add_item_to_checklist' },
                        { name: 'addLabelOnBoard', value: 'add_label_on_board' },
                        { name: 'addLabelToCard', value: 'add_label_to_card' },
                        { name: 'addListToBoard', value: 'add_list_to_board' },
                        { name: 'addMemberToBoard', value: 'add_member_to_board' },
                        { name: 'addMemberToCard', value: 'add_member_to_card' },
                        { name: 'addOptionToCustomField', value: 'add_option_to_custom_field' },
                        { name: 'addStickerToCard', value: 'add_sticker_to_card' },
                        { name: 'addWebhook', value: 'add_webhook' },
                        { name: 'copyBoard', value: 'copy_board' },
                        { name: 'setCustomFieldOnCard', value: 'set_custom_field_on_board' }
                    ))
                .addStringOption(option => option.setName("get").setDescription("Get data about your trello settings")
                    .addChoices(
                        { name: "getListIDs", value: "get_list_ids" },
                        { name: "getCardIDs", value: "get_card_ids"}
                    ))
        ),

    async execute(client, interaction) {
        const db = await r.table("trello").get(interaction.user.id).run(client.con);
        if (!db?.key) return interaction.reply("Not authorized!\nUse \`/trello auth\`")
        if (!db?.token) return interaction.reply("Not authorized!\nUse \`/trello auth\`")

        switch (interaction.options.getSubcommand()) {
            case "auth":
                await r.table("trello").insert({ uid: interaction.user.id, key: interaction.options.getString("key"), token: interaction.options.getString("token") }, { conflict: "update" }).run(client.con)

                await interaction.reply({ content: `Your key and token successfully added to database.\n\nToken: ${interaction.options.getString("token")}\nKey: ${interaction.options.getString("key")}`, ephemeral: true})
                break;
            case "options":
                const add = await interaction.options.getString("add");

                switch (add) {
                    case "add_card_choice":
                        const addCard = new Modal({
                            customId: `cardAdd-modal`,
                            title: "Create trello card",
                            components: [
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "cardAdd_name", label: "Card name", style: "SHORT", placeholder: "Your card name", minLength: 2, required: true }]},
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT",  style: "PARAGRAPH", customId: "cardAdd_desc", label: "Card description", placeholder: "Your card description", minLength: 2, required: true }]},
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "cardAdd_listid", label: "list ID", placeholder: "Your list ID (from example: https://trello.com/b/NrfT9JgV/skyndalex-v10.json)", minLength: 2, required: true }]},
                            ]
                        })

                        let showAddCardModal = await showModal(interaction, addCard, "cardAdd-modal",2 * 60 * 1000)


                        let name = showAddCardModal.fields.getTextInputValue("cardAdd_name")
                        let desc = showAddCardModal.fields.getTextInputValue("cardAdd_desc")
                        let listid = showAddCardModal.fields.getTextInputValue("cardAdd_listid")

                        let row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId("trello_add_card_confirm")
                                    .setStyle("SUCCESS")
                                    .setLabel("Confirm")
                            )

                        let messageConfirmEmbed = new MessageEmbed()
                            .setTitle("Are you sure?")
                            .setDescription("You provided these values:")
                            .addField(`Name`, `${name}`, true)
                            .addField(`Description`, `${desc}`, true)
                            .addField(`List ID`, `${listid}`, true)
                            .setColor("BLUE")
                        showAddCardModal.reply({
                            embeds: [messageConfirmEmbed],
                            components: [row]
                        })
                        break
                    case "add_attach_to_card":
                        const addAttachToCardModal = new Modal({
                            customId: `cardAttachAdd`,
                            title: "Add attachement to card",
                            components: [
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "cardAttachAdd_id", label: "Card ID", style: "SHORT", placeholder: "Your card ID", minLength: 2, required: true }]},
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT",  style: "PARAGRAPH", customId: "cardAttachAdd_url", label: "Image URL", placeholder: "Your image URL", minLength: 2, required: true, style: "SHORT"}]},
                            ]
                        })

                        let addAttachToCardModalShow = await showModal(interaction, addAttachToCardModal, "cardAttachAdd", 2 * 60 * 1000)


                        let cardID = addAttachToCardModalShow.fields.getTextInputValue("cardAttachAdd_id");
                        let imageURL = addAttachToCardModalShow.fields.getTextInputValue("cardAttachAdd_url");

                        let attachAddToCardRowConfirm = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId("trello_add_attach_to_card_confirm")
                                    .setStyle("SUCCESS")
                                    .setLabel("Confirm")
                            )

                        let messageConfirmEmbed2 = new MessageEmbed() // TODO: name it (messageConfirmEmbed2)
                            .setTitle("Are you sure?")
                            .setDescription("You provided these values:")
                            .addField(`Card ID`, `${cardID}`)
                            .addField(`Img URL`, `${imageURL}`)
                            .setImage(imageURL)
                            .setColor("BLUE")
                        await addAttachToCardModalShow.reply({ embeds: [messageConfirmEmbed2], components: [attachAddToCardRowConfirm] })
                        break;
                    case "add_board":
                        const addBoardModal = new Modal({
                            customId: `addBoard`,
                            title: "Add new board",
                            components: [
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "addBoard_name", label: "Board name", style: "SHORT", placeholder: "Board name", minLength: 2, required: true, style: "SHORT" }]},
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "addBoard_organizationID", label: "Organization ID", placeholder: "Board organization ID", minLength: 2, style: "SHORT" }]},
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "addBoard_description", label: "Board description", placeholder: "Board description", minLength: 2 }]},
                            ]
                        })

                        let addBoardModalShow = await showModal(interaction, addBoardModal, "addBoard", 2 * 60 * 1000)


                        let boardName = addBoardModalShow.fields.getTextInputValue("addBoard_name");
                        let organizationID = addBoardModalShow.fields.getTextInputValue("addBoard_organizationID");
                        let boardDescription = addBoardModalShow.fields.getTextInputValue("addBoard_description");

                        let boardAddConfirm = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId("board_add_confirm")
                                    .setStyle("SUCCESS")
                                    .setLabel("Confirm")
                            )

                        let messageConfirmEmbed3 = new MessageEmbed() // TODO: name it (messageConfirmEmbed3)
                            .setTitle("Are you sure?")
                            .setDescription("You provided these values:")
                            .addField(`Board name`, `${boardName}`)
                            .addField(`Organization ID`, `${organizationID || "None"}`)
                            .addField(`Board description`, `${boardDescription || "None"}`)
                            .setColor("BLUE")
                        await addBoardModalShow.reply({ embeds: [messageConfirmEmbed3], components: [boardAddConfirm] })
                        break;
                }
                const get = await interaction.options.getString("get");

                switch (get) {
                    case "get_list_ids":
                        const getListIDsModal = new Modal({ // TODO: add modals to client
                            customId: `getListIDsModal`,
                            title: "Get list IDs",
                            components: [
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "board_id", label: "Board ID", placeholder: "Board ID", style: "SHORT", maxLength: 256, minLength: 2 },
                                    ]},
                            ]
                        })

                        let getListIDsModalShow = await showModal(interaction, getListIDsModal, "getListIDsModal", 2 * 60 * 1000)

                        let boardID = getListIDsModalShow.fields.getTextInputValue("board_id")

                        await axios.get(`https://trello.com/b/${boardID}.json`)
                            .then(async function (response) {
                                let listNames = [];

                                for (let i in response.data.lists) {
                                    listNames.push(`${response.data.lists[i].name} : ${response.data.lists[i].id}`)
                                }

                                let embed = new MessageEmbed()
                                    .setDescription(`\`\`\`ansi\n[0;37m${listNames.join(",\n")}\`\`\``)
                                    .setColor("GREEN")
                                await getListIDsModalShow.reply({ embeds: [embed]})
                            });
                        break;
                    case "get_card_ids":
                        const getCardIDsModal = new Modal()
                            .setTitle("Get card IDs")
                            .setCustomId("getCardIDsModal")

                        const getCardIDsModalComponents = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Board ID")
                            .setMaxLength(100)
                            .setCustomId("get_card_ids_board")
                            .setLabel("Board id")

                        const getCardIDsActionRow = new MessageActionRow().addComponents(getCardIDsModalComponents)

                        getCardIDsModal.addComponents(getCardIDsActionRow)

                        await interaction.showModal(getCardIDsModal)

                        const filter = (interaction) => interaction.customId === "getCardIDsModal";

                        await interaction.awaitModalSubmit({ filter, time: 15_000 }).then(async interaction => {
                            let boardID2 = interaction.fields.getTextInputValue("get_card_ids_board")

                            await axios.get(`https://trello.com/b/${boardID2}.json`)
                                .then(async function (response) {
                                    let list = [];
                                    for (let x in response.data.cards) {
                                        list.push(`${response.data.cards[x].name} : ${response.data.cards[x].id}`)
                                    }

                                    if (list.length > 2000) {
                                        hastebin.createPaste(`(CTRL + F to search)\nCard name : Card ID\nBoard name: ${response.data.name}\nDescription: ${response.data.desc}\n\n${list.join(",\n")}`, {
                                            raw: true,
                                            contentType: 'text/plain',
                                            server: 'https://hastebin.com'
                                        }, {})
                                            .then(async function (urlToPaste) {
                                                interaction.channel.send({content: `\`\`\`ansi\n[0;31mYour message is too long, so I've moved the reply elsewhere.\nHaste: ${urlToPaste}\`\`\``});
                                            })
                                    } else {
                                        if (list.length < 2000) {
                                            let embed = new MessageEmbed()
                                                .setAuthor({name: `Found ${list.length} cards.`})
                                                .setTitle("\`Card NAME : Card ID\`")
                                                .setDescription(`\`\`\`ansi\n[0;34m${list.join(",\n")}\`\`\``)
                                                .setColor("YELLOW")
                                            interaction.reply({embeds: [embed]})
                                        }
                                    }
                                })
                        });

                        break;
                }
                break;
        }
    }
}