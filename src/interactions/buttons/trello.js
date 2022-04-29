const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");
exports.run = async (client, interaction) => {
    switch (interaction.customId) {
        case "trello_add_card_confirm":
            break;
    }
}