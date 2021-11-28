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
        let userID = await interaction.options.getString("userid");

        let dev = ["817883855310684180"];
        if (!dev.includes(message.author.id)) return message.reply(client.string.dev.error_permissions);

        await r.table("gbans").insert({ uid: userID, gban: true }).run(client.con);
        await r.table("gbans").update({ uid: userID, gban: true }).run(client.con);

        const embed = new MessageEmbed()
            .setDescription(`User ID: ${interaction.options.getString("userid")}\ngban: **true**`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
};