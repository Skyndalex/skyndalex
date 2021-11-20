const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings"),
    async execute(client, interaction) {
        for (let option of interaction.options.data) {
            switch (option.name) {

                }
            }
        }
};