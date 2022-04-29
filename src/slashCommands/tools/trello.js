const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");

module.exports = { // TODO: remove sub commands and rewrite to choices.
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addSubcommand(subcommand =>
            subcommand
                .setName("auth")
                .setDescription("Trello account authentication")
                .addStringOption(option => option.setName("key").setDescription("Account key").setRequired(true))
                .addStringOption(option => option.setName("token").setDescription("Application token").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("set")
                .setDescription("Trello settings")
                .addStringOption(option => option.setName("add").setDescription("Add options")
                    .addChoices(
                        { name: 'addCard', value: 'add_card_choice' },
                        { name: 'addAttachmentToCard', value: 'add_attach_to_card'}
                    )),
        ),

    async execute(client, interaction) {
        switch (interaction.options.getSubcommand()) {
            case "auth":
                await r.table("trello").insert({ uid: interaction.user.id, key: interaction.options.getString("key"), token: interaction.options.getString("token") }, { conflict: "update" }).run(client.con)

                await interaction.reply({ content: `Your key and token successfully added to database.\n\nToken: ${interaction.options.getString("token")}\nKey: ${interaction.options.getString("key")}`, ephemeral: true})
                break;
            case "set":
                const add = await interaction.options.getString("add");

                switch (add) {
                    case "add_card_choice":
                        const modal = new Modal({
                            customId: `cardAdd-${interaction.id}`,
                            title: "Create trello card",
                            components: [
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "cardAdd_name", label: "Card name", style: "SHORT", placeholder: "Your card name", minLength: 2}] },
                                { type: "ACTION_ROW", components: [
                                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "cardAdd_desc", label: "Card description", placeholder: "Your card description", minLength: 2 }] },
                            ]
                        })

                        const useModal = async (
                            sourceInteraction,
                            cardAddModal,
                            timeout = 2 * 60 * 1000,
                        ) => {
                            await sourceInteraction.showModal(cardAddModal);

                            return sourceInteraction
                                .awaitModalSubmit({
                                    time: timeout,
                                    filter: (filterInteraction) =>
                                        filterInteraction.customId === `cardAdd-${sourceInteraction.id}`,
                                })
                                .catch(() => null);
                        };

                        const modalSubmitComplaintInteractionSuggestions = await useModal(interaction, modal)

                        let name = modalSubmitComplaintInteractionSuggestions.fields.getTextInputValue("cardAdd_name")
                        let desc = modalSubmitComplaintInteractionSuggestions.fields.getTextInputValue("cardAdd_desc")

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
                            .addField(`Name`, `${name}`)
                            .addField(`Description`, `${desc}`)
                            .setColor("BLUE")
                        await modalSubmitComplaintInteractionSuggestions.reply({ embeds: [messageConfirmEmbed], components: [row] })
                        break
                }
                break;
        }
    }
}