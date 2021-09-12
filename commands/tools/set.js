const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Ustawienia serwerowe.')
        .addChannelOption(option => (
            option.setName("broadcast").setDescription("Kanał ogłoszeniowy")
        )).addChannelOption(option => (
            option.setName('vote').setDescription("Kanał głosowań")
        )).addChannelOption(option => (
            option.setName("complaint").setDescription("Kanał skarg")
        )).addChannelOption(option => (
            option.setName("images").setDescription("Kanał obrazkowy")
        )).addChannelOption(option => (
            option.setName("welcome").setDescription("Kanał powitań")
        )).addChannelOption(option => (
            option.setName("goodbye").setDescription("Kanał pożegnań")
        )).addChannelOption(option => (
            option.setName("suggest").setDescription("Kanał sugestii")
        )).addChannelOption(option => (
            option.setName("application").setDescription("Kanał podań")
        )),

    async execute(client, interaction) {
        if (interaction.options.getChannel("broadcast")) {
            const channel = await interaction.options.getChannel("broadcast");

           await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id}).run(client.con)

            interaction.reply({content: `Pomyślnie ustawiono kanał ogłoszeń! (<#${channel.id}> ${channel.name})`, ephemeral: true})
        } else {
            if (interaction.options.getChannel("vote")) {
                const votechannel = await interaction.options.getChannel("vote");

                await r.table("settings").insert({ id: interaction.guild.id,  voteChannel: votechannel.id }).run(client.con)

                await r.table("settings").update({voteChannel: votechannel.id}).run(client.con)

                interaction.reply({content: `Pomyślnie ustawiono kanał głosowań! (<#${votechannel.id}> ${votechannel.name})`, ephemeral: true})
            }
        }
    }
};
