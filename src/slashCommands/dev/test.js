const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
const {showModal, useModal} = require("../../utils/modals");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command")
        .setDefaultPermission(false),

    async execute(client, interaction) {
        const getCardIDsModal = new Modal({ // TODO: add modals to client
            customId: `getCardIDsModal`,
            title: "Get card IDs",
            components: [
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "boardId", label: "Board ID", placeholder: "Board ID", style: "SHORT", maxLength: 256, minLength: 2 },
                    ]},
            ]
        })

        await showModal(interaction, getCardIDsModal, "getCardIDsModal", 2 * 60 * 1000)
        await useModal(interaction, getCardIDsModal)

        if (interaction.fields.getTextInputValue("boardId")) {
            interaction.reply(`\`${interaction.fields.getTextInputValue("boardId")}`)
        }

    }
}