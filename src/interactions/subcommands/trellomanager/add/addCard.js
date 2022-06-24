const { Modal, MessageActionRow, TextInputComponent } = require("discord.js");
module.exports = async (client, interaction) => {
    const addCardModal = new Modal()
        .setTitle("Add card")
        .setCustomId("addCardModal")

    const addCardModalComponent_Name = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Card name")
        .setMaxLength(100)
        .setCustomId("addCard_component_name")
        .setLabel("Card name")

    const addCardModalComponent_Description = new TextInputComponent()
        .setStyle("PARAGRAPH")
        .setPlaceholder("Card description")
        .setMaxLength(100)
        .setCustomId("addCard_component_description")
        .setLabel("Card description")

    const addCardModalComponent_ListID = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("List ID")
        .setMaxLength(100)
        .setCustomId("addCard_listID")
        .setLabel("List ID")

    const firstActionRow = new MessageActionRow().addComponents(addCardModalComponent_Name)
    const secondActionRow = new MessageActionRow().addComponents(addCardModalComponent_ListID)
    const threeActionRow = new MessageActionRow().addComponents(addCardModalComponent_Description)

    addCardModal.addComponents(firstActionRow, secondActionRow, threeActionRow)
    await interaction.showModal(addCardModal)
}