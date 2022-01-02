const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mem')
        .setDescription('Generuje śmieszny mem z memy.pl'),

    async execute(client, interaction) {
        fetch('https://memy.pl/losuj')
            .then(res => res.text())
            .then(body => {
                const root = parse(body)
                const img = parse(root.querySelector('.meme-item figure').toString())
                const mem = img.querySelector('img').getAttribute('src')

                client.builder(interaction, "", "", "Źródło: memy.pl", "#000000", "", mem)
            })
    }
};
