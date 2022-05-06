const { Modal } = require("discord.js");
exports.run = async (client, interaction) => {
    const testModal = new Modal({ // TODO: add modals to client
        customId: `testModal-${interaction.id}`,
        title: "docs.skyndalex.xyz/builders",
        components: [
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "title", label: "title embed component", placeholder: "Embed title", style: "SHORT", maxLength: 256, minLength: 2 },
                ]},
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "desc", label: "description embed component", placeholder: "Embed description", maxLength: 2048, minLength: 2  }
                ]},
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "footer", label: "footer embed component", placeholder: "Embed footer", style: "SHORT", maxLength: 2048, minLength: 2 },
                ]},
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "author", label: "author embed component", placeholder: "Embed author", style: "SHORT", maxLength: 256, minLength: 2 },
                ]},
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "color", label: "color embed component", placeholder: "Embed color",  style: "SHORT", maxLength: 10, minLength: 2 },
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
    const { submitInteraction }  = await useModal(interaction, testModal)
}