const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");
exports.run = async (client, interaction) => {
    let db = await r.table("trello").get(interaction.user.id).run(client.con);
    let manager = new Trello;

    switch (interaction.customId) {
        case "trello_add_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })

            console.log(interaction.fields.getTextInputValue())
            break;
    }
}