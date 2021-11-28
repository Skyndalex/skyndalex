const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gban')
        .setDescription('Gban user')
        .addStringOption(option => (
            option.setName("userid").setDescription("User ID")
        )),

    async execute(client, interaction) {
        let dev = [];
        if (!dev.includes(message.author.id)) return interaction.reply(client.strings.dev.error_permissions);

        let userID = await interaction.options.getString("userid");

        await r.table("gbans").insert({ uid: userID, gban: true }).run(client.con);
        await r.table("gbans").update({ uid: userID, gban: true }).run(client.con);

        const embed = new MessageEmbed()
            .setDescription(`User ID: ${interaction.options.getString("userid")}\ngban: **true**`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
};