const { Modal, MessageActionRow, TextInputComponent, MessageButton, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
    const addAttachToCardModal = new Modal()
        .setTitle("cardAttachAdd")
        .setCustomId("Add attachement to card")

    const addAttachToCardModalComponent_Id = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Card ID")
        .setMaxLength(100)
        .setCustomId("cardAttachAdd_id")
        .setLabel("Card ID")

    const addAttachToCardModalComponent_Url = new TextInputComponent()
        .setStyle("SHORT")
        .setPlaceholder("Attachment URL")
        .setMaxLength(100)
        .setCustomId("cardAttachAdd_url")
        .setLabel("Attachment URL")

    const firstActionRow = new MessageActionRow().addComponents(addAttachToCardModalComponent_Id);
    const secondActionRow = new MessageActionRow().addComponents(addAttachToCardModalComponent_Url);

    await addAttachToCardModal.addComponents(firstActionRow, secondActionRow)
    await interaction.showModal(addAttachToCardModal);

    const filter = (interaction) => interaction.customId === "cardAttachAdd";
    await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
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
            .addField(`Card ID`, `${interaction.fields.getTextInputValue("cardAttachAdd_id")}`)
            .addField(`Attachment URL`, `${interaction.fields.getTextInputValue("cardAttachAdd_url")}`)
            .setImage(interaction.fields.getTextInputValue("cardAttachAdd_url"))
            .setColor("BLUE")
        await interaction.reply({ embeds: [messageConfirmEmbed2], components: [attachAddToCardRowConfirm] })
    })
}