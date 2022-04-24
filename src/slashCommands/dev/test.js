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
            customId: `testModal-${interaction.id}`,
            title: "docs.skyndalex.xyz/builders",
            components: [
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "title", label: "title embed component", placeholder: "Embed title", minLength: 2, maxLength: 500, style: "SHORT" },
                    ]
                },
                { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "desc", label: "description embed component", placeholder: "Embed description", minLength: 2, maxLength: 500 }
                    ]},
                { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "footer", label: "footer embed component", placeholder: "Embed footer", minLength: 2, maxLength: 500, style: "SHORT" },
                    ]},
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "author", label: "author embed component", placeholder: "Embed author", minLength: 2, maxLength: 500, style: "SHORT" },
                    ]},
                { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "color", label: "color embed component", placeholder: "Embed color", minLength: 2, maxLength: 500, style: "SHORT" },
                    ]},
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
                        filterInteraction.customId === `testModal-${sourceInteraction.id}`,
                })
                .catch(() => null);
        };
        const submitInteraction = await useModal(interaction, testModal)

    }}