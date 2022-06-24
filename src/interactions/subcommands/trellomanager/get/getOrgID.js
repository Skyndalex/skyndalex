const { fetch } = require("undici");
const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
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

        const res = await fetch(`https://trello.com/b/${boardID}.json`)
        const json = await res.json();

        await interaction.reply(`\`\`\`ansi\n\u001B[1;32mOrganization ID for board ${json.name}: ${json.idOrganization} \`\`\``)
    })
}