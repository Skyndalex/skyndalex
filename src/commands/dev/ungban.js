const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ungban')
        .setDescription('Ungban user')
        .addStringOption(option => (
            option.setName("userid").setDescription("User ID")
        )),

    async execute(client, interaction) {
        let dev = ["817883855310684180"];
        if (!dev.includes(message.author.id)) return message.reply(client.strings.dev.error_permissions);

        let userID = await interaction.options.getString("userid");

        await r.table("gbans").update({ gban: false }).run(client.con);

        const embed = new MessageEmbed()
            .setDescription(`User ID: ${interaction.options.getString("userid")}\ngban: **false**`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
};