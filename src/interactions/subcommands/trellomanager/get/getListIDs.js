const { fetch } = require("undici");
const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
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

        const res = await fetch(`https://trello.com/b/${boardID}.json`);
        const json = await res.json()

        let listNames = [];

        for (let i in json.lists) {
            listNames.push(`${json.lists[i].name} : ${json.lists[i].id}`)
        }

        let embed = new MessageEmbed()
            .setDescription(`\`\`\`ansi\n[0;37m${listNames.join(",\n")}\`\`\``)
            .setColor("GREEN")
        await interaction.reply({ embeds: [embed]})
    });
}