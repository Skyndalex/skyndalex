const { Client, Modal } = require('discord.js');
const r = require('rethinkdb');
const strings = require('./utils/strings.json');
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = 'v1.0 BETA';
        this.site = 'https://skyndalex.xyz';
        this.strings = strings;
    }
    useModal () {
        const useModal = async (
            sourceInteraction,
            modal,
            timeout = 2 * 60 * 1000,
        ) => {
            await sourceInteraction.showModal(modal)

            return sourceInteraction
                .awaitModalSubmit({
                    time: timeout,
                    filter: (filterInteraction) =>
                        filterInteraction.customId === `builderModal`,
                })
                .catch(() => null);
        }

    }
}
module.exports = Base;
