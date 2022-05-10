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
            customId: `testmodal`,
            title: "Get card IDs",
            components: [
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "test", label: "Board ID", placeholder: "Board ID", style: "SHORT", maxLength: 256, minLength: 2 },
                    ]},
            ]
        })

        let modal = await showModal(interaction, getCardIDsModal, "testmodal", 2 * 60 * 1000)

        if (modal.fields.getTextInputValue("test")) {
            modal.reply(`\`${modal.fields.getTextInputValue("test")}\``)
        }
    }
}