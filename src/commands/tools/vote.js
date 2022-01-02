const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Wyślij głosowanie.')
        .addStringOption(option => (
            option.setName("text").setDescription("Treść głosowania").setRequired(true)
        )),
    async execute(client, interaction) {
        const table = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!table?.voteChannel) return interaction.reply({content: "Nie ustawiono kanału głosowań!", ephemeral: true})

        const text = interaction.options.getString("text");

        const embed = new MessageEmbed()
            .setDescription(`**Nowe głosowanie!**\n\nTreść: ${text}\nAutor: ${interaction.user.tag}`, `Głosowania`, `GREEN`, ``, ``)
            .setColor("GREEN")
        client.channels.cache.get(table.voteChannel).send({embeds: [embed]}).then(r => {
            r.react("👍")
            r.react("👎")
        })

        interaction.reply({content: "Wysłano!", ephemeral: true})
    }
};