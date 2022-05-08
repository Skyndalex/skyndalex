const {Modal} = require("discord.js");
exports.run = async (client, interaction) => {
    const getCardIDsModal = new Modal({ // TODO: add modals to client
        customId: `getCardIDsModal`,
        title: "Get card IDs",
        components: [
            { type: "ACTION_ROW", components: [
                    { type: "TEXT_INPUT", style: "PARAGRAPH", customId: "boardId", label: "Board ID", placeholder: "Board ID", style: "SHORT", maxLength: 256, minLength: 2 },
                ]},
        ]
    })
    const getCardIDs = async (
        sourceInteraction,
        getCardIDsModal,
        timeout = 2 * 60 * 1000,
    ) => {
        await sourceInteraction.showModal(getCardIDsModal);

        return sourceInteraction
            .awaitModalSubmit({
                time: timeout,
                filter: (filterInteraction) =>
                    filterInteraction.customId === `getCardIDsModal`,
            })
            .catch(() => null);
    };
    const { submitInteraction2 } = await getCardIDs(interaction, getCardIDsModal)
}