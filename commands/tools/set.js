const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
const {MessageEmbed} = require("discord.js");
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

            interaction.reply({content: `Pomyślnie ustawiono kanał ogłoszeń! (<#${channel.id}> ${channel.name})`, ephemeral: true});
        } else {
            if (interaction.options.getChannel("głosowania")) {
                const votechannel = await interaction.options.getChannel("vote");

                await r.table("settings").insert({ id: interaction.guild.id,  voteChannel: votechannel.id }).run(client.con);
                await r.table("settings").update({id: interaction.guild.id, voteChannel: votechannel.id}).run(client.con);

                interaction.reply({content: `Pomyślnie ustawiono kanał głosowań! (<#${votechannel.id}> ${votechannel.name})`, ephemeral: true});
            }
        }
    }
};