const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js");
const { fetch } = require("undici");
const hastebin = require("hastebin");
module.exports = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);

    const getChecklistModal = new Modal()
        .setTitle("Get checklists")
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
}