const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('jeja')
        .setDescription('Generuje śmieszny mem z jeja.pl'),

    async execute(client, interaction) {
        fetch('https://memy.jeja.pl/losowe')
            .then(res => res.text())
            .then(body => {
                const root = parse(body)
                const img = parse(root.querySelector('.ob-left-image').toString())
                const mem = img.querySelector('img').getAttribute('src')

                client.builder(interaction, "", "", "Źródło: jeja.pl", "#000000", "", mem)
            })
    }
};
