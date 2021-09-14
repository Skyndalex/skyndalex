const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ogłoszenie')
        .setDescription('Wyślij ogłoszenie.')
        .addStringOption(option => (
            option.setName("args").setDescription("Treść ogłoszenia.").setRequired(true)
    )),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true})

        if (interaction.options.getString("args")) {
            const broadcast = interaction.options.getString("args");

            const channel = await r.table("settings").get(interaction.guild.id).run(client.con)
            if (!channel?.broadcastChannel) return interaction.reply({ content: "Nie ustawiono kanału ogłoszeń!", ephemeral: true })

            const broadcastEmbed = new MessageEmbed()
                .setDescription(`**Nowe ogłoszenie**\n\n${broadcast}`)
                .setColor("GREEN")
            client.channels.cache.get(channel.broadcastChannel).send({embeds: [broadcastEmbed]})

            interaction.reply({content: `Wysłano ogłoszenie na <#${channel.broadcastChannel}>!`, ephemeral: true})
        }
    }
};