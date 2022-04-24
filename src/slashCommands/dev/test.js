const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("sussssssssssssssssssssssssssssssssssssssssssss"), execute: async function (client, interaction) {
        let dev = ["817883855310684180"];
        if (!dev.includes(interaction.user.id)) return interaction.reply({
            content: client.strings.dev.NO_PERMISSION_INFO,
            allowedMentions: {parse: []}
        })

        const testModal = new Modal({ // TODO: add modals to client
            customId: `ticketComplaint-${interaction.id}`,
            title: "docs.skyndalex.xyz/builders",
            components: [
                {
                    type: "ACTION_ROW", components: [
                        {type: "TEXT_INPUT", style: "PARAGRAPH", customId: "title", label: "title embed component"},
                    ]
                },
                {
                    type: "ACTION_ROW", components: [
                        {
                            type: "TEXT_INPUT",
                            style: "PARAGRAPH",
                            customId: "desc",
                            label: "description embed component"
                        },
                    ]
                },
                {
                    type: "ACTION_ROW", components: [
                        {type: "TEXT_INPUT", style: "PARAGRAPH", customId: "footer", label: "footer embed component"},
                    ]
                },
                {
                    type: "ACTION_ROW", components: [
                        {type: "TEXT_INPUT", style: "PARAGRAPH", customId: "author", label: "author embed component"},
                    ]
                },
                {
                    type: "ACTION_ROW", components: [
                        {type: "TEXT_INPUT", style: "PARAGRAPH", customId: "color", label: "color embed component"},
                    ]
                },
            ]
        })
        const useModal = async (
            sourceInteraction,
            testModal,
            timeout = 2 * 60 * 1000,
        ) => {
            await sourceInteraction.showModal(testModal);

            return sourceInteraction
                .awaitModalSubmit({
                    time: timeout,
                    filter: (filterInteraction) =>
                        filterInteraction.customId === `ticketComplaint-${sourceInteraction.id}`,
                })
                .catch(() => null);
        };
        const submitInteraction = await useModal(interaction, testModal)


        let embed = new MessageEmbed()
        if (submitInteraction.fields.getTextInputValue("title")) embed.setTitle(submitInteraction.fields.getTextInputValue("title"))
        if (submitInteraction.fields.getTextInputValue("desc")) embed.setDescription(submitInteraction.fields.getTextInputValue("desc"))
        if (submitInteraction.fields.getTextInputValue("color")) embed.setColor(submitInteraction.fields.getTextInputValue("color"))
        if (submitInteraction.fields.getTextInputValue("footer")) embed.setFooter({text: submitInteraction.fields.getTextInputValue("footer")})
        if (submitInteraction.fields.getTextInputValue("author")) embed.setAuthor({name: submitInteraction.fields.getTextInputValue("author")})

        await submitInteraction.reply({ embeds: [embed] })
    }}