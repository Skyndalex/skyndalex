const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require("axios");
const { fetch } = require("undici");

const {MessageEmbed, Modal, MessageActionRow, MessageButton, TextInputComponent} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addSubcommand(subcommand =>
            subcommand
                .setName("auth")
                .setDescription("Trello account authentication")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("options")
                .setDescription("Trello settings")
                .addStringOption(option => option.setName("add").setDescription("Add options")
                    .addChoices(
                        { name: 'Add card', value: 'add_card_choice' },
                        { name: 'Add attachment to card', value: 'add_attach_to_card' },
                        { name: 'Add board', value: 'add_board' },
                        { name: 'Add checklist to card', value: 'add_checklist_to_card' },
                        { name: 'Add comment to card', value: 'add_comment_to_card' },
                      // { name: 'Add existing checklist to card', value: 'add_existing_checklist_to_card' },
                        { name: 'Add item to checklist', value: 'add_item_to_checklist' },
                        { name: 'Add label on board', value: 'add_label_on_board' },
                        { name: 'Add label to card', value: 'add_label_to_card' },
                        { name: 'Add list to board', value: 'add_list_to_board' },
                        { name: 'Add member to board', value: 'add_member_to_board' },
                        { name: 'Add member to card', value: 'add_member_to_card' },
                        { name: 'Add option to custom field', value: 'add_option_to_custom_field' },
                        { name: 'Add sticker to card', value: 'add_sticker_to_card' },
                        { name: 'Add webhook', value: 'add_webhook' },
                        { name: 'Copy board', value: 'copy_board' },
                        { name: 'Set custom field on card', value: 'set_custom_field_on_board' }
                    )
                )
                .addStringOption(option => option.setName("update").setDescription("Update options")
                    .addChoices(
                        { name: "updateCard", value: "update_card" },
                        { name: "Update board", value: "update_board" },
                        { name: "Update membership of member on board", value: "update_membership_of_member_on_board" },
                        { name: "Update checkitem on card", value: "update_checkitem_on_card" },
                        { name: "Update sticker on card", value: "update_sticker_on_card" },
                        { name: "Update checkitem on checklist on card", value: "update_checkitem_on_checklist_on_card" }
                    )
                )
                .addStringOption(option => option.setName("get").setDescription("Get data about your trello settings")
                    .addChoices(
                        { name: "Get lists", value: "get_list_ids" },
                        { name: "Get cards", value: "get_card_ids" },
                        { name: "Get board organization", value: "get_org_id" },
                        { name: "Get checklist", value: "get_check_list"},
                        { name: "Get boards", value: "get_board_ids" },
                    )
                )
        ),

    async execute(client, interaction) {
        const db = await r.table("trello").get(interaction.user.id).run(client.con);
        switch (interaction.options.getSubcommand()) {
            case "auth":
                const { authURL } = require("../../../config.json").discord

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("LINK")
                            .setLabel("Authorize here")
                            .setURL(authURL)
                    );

                let authInfo = new MessageEmbed()
                    .setDescription(`To continue, you must authorize your trello and discord account. I need access to your board information`)
                    .setColor("BLURPLE")
                await interaction.reply({ embeds: [authInfo], components: [row] });
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

                        let messageConfirmEmbed2 = new MessageEmbed()
                            .setTitle("Are you sure?")
                            .setDescription("You provided these values:")
                            .addField(`Card ID`, `${cardID}`)
                            .addField(`Img URL`, `${imageURL}`)
                            .setImage(imageURL)
                            .setColor("BLUE")
                        await addAttachToCardModalShow.reply({ embeds: [messageConfirmEmbed2], components: [attachAddToCardRowConfirm] })
                        break;
                    case "add_board":
                        const addBoardModal = new Modal()
                            .setTitle("Add board")
                            .setCustomId("addBoard")

                        const addBoardModalComponent_NAME = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Board Name")
                            .setMaxLength(100)
                            .setCustomId("addBoard_name")
                            .setLabel("Board name")

                        const addBoardModalComponent_ORGANIZATIONID = new TextInputComponent()
                            .setStyle("SHORT")
                            .setPlaceholder("Organization ID")
                            .setMaxLength(100)
                            .setCustomId("addBoard_organizationID")
                            .setLabel("Organization ID")

                        const addBoardModalComponent_DESCRIPTION = new TextInputComponent()
                            .setStyle("PARAGRAPH")
                            .setRequired(true)
                            .setPlaceholder("Description")
                            .setMaxLength(100)
                            .setCustomId("addBoard_description")
                            .setLabel("Description")
                        const firstActionRow = new MessageActionRow().addComponents(addBoardModalComponent_NAME)
                        const secondActionRow = new MessageActionRow().addComponents(addBoardModalComponent_ORGANIZATIONID)
                        const threeActionRow = new MessageActionRow().addComponents(addBoardModalComponent_DESCRIPTION)

                        addBoardModal.addComponents(firstActionRow, secondActionRow, threeActionRow)
                        await interaction.showModal(addBoardModal)

                        const filter = (interaction) => interaction.customId === "addBoard";
                        await interaction.awaitModalSubmit({ filter, time: 15_000 }).then(async interaction => {
                            let boardName = interaction.fields.getTextInputValue("addBoard_name");
                            let organizationID = interaction.fields.getTextInputValue("addBoard_organizationID");
                            let boardDescription = interaction.fields.getTextInputValue("addBoard_description");

                            let boardAddConfirm = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId("board_add_confirm")
                                        .setStyle("SUCCESS")
                                        .setLabel("Confirm")
                                )

                            let messageConfirmEmbed3 = new MessageEmbed()
                                .setTitle("Are you sure?")
                                .setDescription("You provided these values:")
                                .addField(`Board name`, `${boardName}`)
                                .addField(`Organization ID`, `${organizationID || "None"}`)
                                .addField(`Board description`, `${boardDescription || "None"}`)
                                .setColor("BLUE")
                            await interaction.reply({ embeds: [messageConfirmEmbed3], components: [boardAddConfirm] })
                        });
                        break;
                    case "add_checklist_to_card":
                        const addCheckListModal = new Modal()
                            .setTitle("Add check list")
                            .setCustomId("add_check_list_modal")

                        const addCheckList_CardID = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Card ID (get card ids: /trello options)")
                            .setMaxLength(100)
                            .setCustomId("add_check_list_card_id_component")
                            .setLabel("Card ID")

                        const addCheckList_Name = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Checklist name")
                            .setMaxLength(100)
                            .setCustomId("add_check_list_name_component")
                            .setLabel("Add checklist")

                        const addChecklistCardIdRow = new MessageActionRow().addComponents(addCheckList_CardID)
                        const addChecklistNameRow = new MessageActionRow().addComponents(addCheckList_Name)

                        addCheckListModal.addComponents(addChecklistCardIdRow, addChecklistNameRow)
                        await interaction.showModal(addCheckListModal)

                        const addChecklistFilter = (interaction) => interaction.customId === "add_check_list_modal";
                        await interaction.awaitModalSubmit({ addChecklistFilter, time: 15000 }).then(async interaction => {
                            let cardID = interaction.fields.getTextInputValue("add_check_list_card_id_component");
                            let checklistName = interaction.fields.getTextInputValue("add_check_list_name_component");

                            let addChecklistConfirm = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId("add_checklist_confirm")
                                        .setStyle("SUCCESS")
                                        .setLabel("Confirm")
                                )

                            let messageConfirmEmbed3 = new MessageEmbed()
                                .setTitle("Are you sure?")
                                .setDescription("You provided these values:")
                                .addField(`Card ID`, `${cardID}`)
                                .addField(`Checklist name`, `${checklistName || "None"}`)
                                .setColor("BLUE")
                            await interaction.reply({ embeds: [messageConfirmEmbed3], components: [addChecklistConfirm] })
                        })
                        break;
                    case "add_comment_to_card":
                        const addCommentToCardModal = new Modal()
                            .setTitle("Add comment")
                            .setCustomId("add_comment_to_card_modal")

                        const addCommentToCard_CardID = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Card ID (get card ids: /trello options)")
                            .setMaxLength(100)
                            .setCustomId("add_comment_card_id_component")
                            .setLabel("Card ID")

                        const addCommentToCard_Text = new TextInputComponent()
                            .setStyle("PARAGRAPH")
                            .setRequired(true)
                            .setPlaceholder("Comment")
                            .setMaxLength(1000)
                            .setCustomId("add_comment_description_component")
                            .setLabel("Comment description")

                        const addCommentCardIdRow = new MessageActionRow().addComponents(addCommentToCard_CardID)
                        const addCommentDescriptionRow = new MessageActionRow().addComponents(addCommentToCard_Text)

                        addCommentToCardModal.addComponents(addCommentCardIdRow, addCommentDescriptionRow)
                        await interaction.showModal(addCommentToCardModal)

                        const addCommentFilter = (interaction) => interaction.customId === "add_comment_to_card_modal";
                        await interaction.awaitModalSubmit({ addCommentFilter, time: 15000 }).then(async interaction => {
                            let cardID = interaction.fields.getTextInputValue("add_comment_card_id_component")
                            let commentDescription = interaction.fields.getTextInputValue("add_comment_description_component")

                            let addCommentConfirm = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setCustomId("add_comment_confirm")
                                        .setStyle("SUCCESS")
                                        .setLabel("Confirm")
                                )

                            let messageConfirmEmbed4 = new MessageEmbed()
                                .setTitle("Are you sure?")
                                .setDescription("You provided these values:")
                                .addField(`Card ID`, `${cardID}`)
                                .addField(`Comment description`, `${commentDescription || "None"}`)
                                .setColor("BLUE")
                            await interaction.reply({ embeds: [messageConfirmEmbed4], components: [addCommentConfirm] })
                        })
                        break;
                    case "add_item_to_checklist":
                        const addItemToChecklistModal = new Modal()
                            .setTitle("Add item to checklist")
                            .setCustomId("add_comment_to_card_modal")

                        const addItemToChecklist_ChecklistID = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Checklist ID (/trello options)")
                            .setMaxLength(100)
                            .setCustomId("add_item_to_checklist_checklistId_component")
                            .setLabel("Checklist ID")

                        const addItemToChecklist_Name = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Your checklist name")
                            .setMaxLength(100)
                            .setCustomId("add_item_to_checklist_name_component")
                            .setLabel("Checklist Name")

                        const addChecklistIdRow = new MessageActionRow().addComponents(addItemToChecklist_ChecklistID);
                        const addItemToChecklistNameRow = new MessageActionRow().addComponents(addItemToChecklist_Name);

                        addItemToChecklistModal.addComponents(addChecklistIdRow, addItemToChecklistNameRow);
                        await interaction.showModal(addItemToChecklistModal);

                        break;
                }
                const get = await interaction.options.getString("get");

                switch (get) {
                    case "get_list_ids":
                        const getListIDsModal = new Modal()
                            .setTitle("Get list IDs")
                            .setCustomId("getListIDsModal")

                        const boardIdComponent = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Board ID")
                            .setMaxLength(100)
                            .setCustomId("list_id_modal_component")
                            .setLabel("BOARD ID")

                        const row = new MessageActionRow().addComponents(boardIdComponent)
                        getListIDsModal.addComponents(row)

                        await interaction.showModal(getListIDsModal)

                        const getListIDsFilter = (interaction) => interaction.customId === "getListIDsModal";

                        await interaction.awaitModalSubmit({ getListIDsFilter, time: 15000 }).then(async interaction => {
                            let boardID = interaction.fields.getTextInputValue("list_id_modal_component")

                            await axios.get(`https://trello.com/b/${boardID}.json`)
                                .then(async function (response) {
                                    let listNames = [];

                                    for (let i in response.data.lists) {
                                        listNames.push(`${response.data.lists[i].name} : ${response.data.lists[i].id}`)
                                    }

                                    let embed = new MessageEmbed()
                                        .setDescription(`\`\`\`ansi\n[0;37m${listNames.join(",\n")}\`\`\``)
                                        .setColor("GREEN")
                                    await interaction.reply({ embeds: [embed]})
                                });
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

                        await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
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
                    case "get_org_id":
                        const getOrgIdModal = new Modal()
                            .setTitle("Get organization ID")
                            .setCustomId("getOrgIdModal")

                        const getOrgIdModalComponents = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Board ID")
                            .setMaxLength(100)
                            .setCustomId("getOrgIdModalComponent")
                            .setLabel("Board id")

                        const getOrgIdModalRow = new MessageActionRow().addComponents(getOrgIdModalComponents)

                        getOrgIdModal.addComponents(getOrgIdModalRow)

                        await interaction.showModal(getOrgIdModal)

                        const orgFilter = (interaction) => interaction.customId === "getOrgIdModal";

                        await interaction.awaitModalSubmit({ orgFilter, time: 15_000 }).then(async interaction => {
                            let boardID = interaction.fields.getTextInputValue("getOrgIdModalComponent")

                            await axios.get(`https://trello.com/b/${boardID}.json`)
                                .then(async function (response) {
                                    await interaction.reply(`\`\`\`ansi\n\u001B[1;32mOrganization ID for ${response.data.name} board: ${response.data.idOrganization} \`\`\``)
                                })
                        })
                        break;
                    case "get_board_ids":
                        await axios.get(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${db.key}&token=${db.token}`)
                            .then(async function (response) {
                                console.log(response)

                                let x = []
                                for (let i in response.data) {
                                    x.push(`${response.data[i].name} ::: ${response.data[i].id}`)
                                }
                                await interaction.reply(`\`\`\`${x.join(",\n")}\`\`\``)
                            })
                        break;
                    case "get_check_list":
                        const getChecklistModal = new Modal()
                            .setTitle("Get organization ID")
                            .setCustomId("get_checklist_modal")

                        const getChecklistIdCardComponent = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("Card ID")
                            .setMaxLength(100)
                            .setCustomId("get_checklist_modal_card_id_component")
                            .setLabel("Board id")

                        const getChecklistRow = new MessageActionRow().addComponents(getChecklistIdCardComponent)

                        getChecklistModal.addComponents(getChecklistRow)

                        await interaction.showModal(getChecklistModal)

                        const getChecklistFilter = (interaction) => interaction.customId === "get_checklist_modal";

                        await interaction.awaitModalSubmit({ getChecklistFilter, time: 15_000 }).then(async interaction => {
                            const res = await fetch(`https://api.trello.com/1/checklists?idCard=${interaction.fields.getTextInputValue("get_checklist_modal_card_id_component")}&key=${db.key}&token=${db.token}`,
                                { method: "POST" }
                            )
                            const json = await res.json()
                            console.log(json)

                            await interaction.reply(
                                `name: ${json.name}\n\nid: ${json.id}`
                            )
                        })
                        break;
                }
                break;
        }
    }
}