const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Generuje psa.'),

    async execute(client, interaction) {
        fetch('https://some-random-api.ml/img/dog')
            .then(res => res.json())
            .then(res => {
                client.builder(interaction, "", "", "", "GREEN", "", res.link)
            })
    }
};
