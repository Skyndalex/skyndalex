const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Ustawienia serwerowe.')
        .addChannelOption(option => (
            option.setName("ogłoszenia").setDescription("Kanał ogłoszeniowy")
        )).addChannelOption(option => (
            option.setName('głosowania').setDescription("Kanał głosowań")
        )).addChannelOption(option => (
            option.setName("skargi").setDescription("Kanał skarg")
        )).addChannelOption(option => (
            option.setName("obrazki").setDescription("Kanał obrazkowy")
        )).addChannelOption(option => (
            option.setName("powitania").setDescription("Kanał powitań")
        )).addChannelOption(option => (
            option.setName("pożegnania").setDescription("Kanał pożegnań")
        )).addChannelOption(option => (
            option.setName("sugestie").setDescription("Kanał sugestii")
        )).addChannelOption(option => (
            option.setName("podania").setDescription("Kanał podań")
        )),


    async execute(client, interaction) {
        if (interaction.options.getChannel("ogłoszenia")) {
            const channel = await interaction.options.getChannel("ogłoszenia");

            await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${channel.id}> (broadcastChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else {
            if (interaction.options.getChannel("głosowania")) {
                const votechannel = await interaction.options.getChannel("głosowania");

                await r.table("settings").insert({ id: interaction.guild.id, votechannel: votechannel.id }).run(client.con);
                await r.table("settings").update({id: interaction.guild.id, votechannel: votechannel.id}).run(client.con);

                client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${votechannel.id}> (voteChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
            } else {
                if (interaction.options.getChannel("skargi")) {
                    const complaintchannel = await interaction.options.getChannel("skargi");

                    await r.table("settings").insert({ id: interaction.guild.id, complaintChannel: complaintchannel.id }).run(client.con)
                    await r.table("settings").update({ id: interaction.guild.id, complaintChannel: complaintchannel.id }).run(client.con)

                    client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${complaintchannel.id}> (complaintChannel) \nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
                }
            }
        }
    }
};