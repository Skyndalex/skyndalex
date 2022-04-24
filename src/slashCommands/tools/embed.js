const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed builder"),
    async execute(client, interaction) {
        const testModal = new Modal({ // TODO: add modals to client
            customId: `testModal-${interaction.id}`,
            title: "docs.skyndalex.xyz/builders",
            components: [
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "title", label: "title embed component", placeholder: "Embed title", minLength: 2, maxLength: 50, style: "SHORT" },
                    ]},
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "desc", label: "description embed component", placeholder: "Embed description", minLength: 2, maxLength: 500 }
                    ]},
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "footer", label: "footer embed component", placeholder: "Embed footer", minLength: 2, maxLength: 80, style: "SHORT" },
                    ]},
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "author", label: "author embed component", placeholder: "Embed author", minLength: 2, maxLength: 50, style: "SHORT" },
                    ]},
                { type: "ACTION_ROW", components: [
                        { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "color", label: "color embed component", placeholder: "Embed color", minLength: 2, maxLength: 20, style: "SHORT" },
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


        let embed = new MessageEmbed()
        if (submitInteraction.fields.getTextInputValue("title")) embed.setTitle(submitInteraction.fields.getTextInputValue("title"))
        if (submitInteraction.fields.getTextInputValue("desc")) embed.setDescription(submitInteraction.fields.getTextInputValue("desc"))
        if (submitInteraction.fields.getTextInputValue("color")) embed.setColor(submitInteraction.fields.getTextInputValue("color"))
        if (submitInteraction.fields.getTextInputValue("footer")) embed.setFooter({ text: submitInteraction.fields.getTextInputValue("footer")})
        if (submitInteraction.fields.getTextInputValue("author")) embed.setAuthor({ name: submitInteraction.fields.getTextInputValue("author")})

        await submitInteraction.reply({ embeds: [embed] })
    }
}