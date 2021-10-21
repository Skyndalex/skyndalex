const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Wyślij propozycje.')
        .addStringOption(option => (
            option.setName("suggestion").setDescription("Treść sugestii.").setRequired(true)
        )),
    async execute(client, interaction) {
            const suggestion = interaction.options.getString("suggestion");

            const channel = await r.table("settings").get(interaction.guild.id).run(client.con)
            if (!channel?.suggestionChannel) return interaction.reply({ content: "Nie ustawiono kanału ogłoszeń!", ephemeral: true });

            const suggestionEmbed = new MessageEmbed()
                .setDescription(`**Nowa sugestia**\n\nAutor: ${interaction.user.tag}\nTreść: \`${suggestion}\``)
                .setColor("GREEN")
            client.channels.cache.get(channel.suggestionChannel).send({embeds: [suggestionEmbed]});

            interaction.reply({content: `Wysłano propozycje na <#${channel.broadcastChannel}>!\n\`Treść: ${suggestion}\``, ephemeral: true});
    }
};