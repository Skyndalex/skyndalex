exports.showModal = async (sourceInteraction, modal, customId,  timeout) => {
    await sourceInteraction.showModal(modal);

    return sourceInteraction
        .awaitModalSubmit({
            time: timeout,
            filter: (filterInteraction) =>
                filterInteraction.customId === customId,
        })
        .catch(() => null);
}
exports.useModal = async (interaction, modal) => {
    const submitInteraction = await useModal(interaction, modal)
}