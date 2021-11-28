const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('application')
        .setDescription('Application.')
        .addStringOption(option => (
            option.setName("arguments").setDescription("Application description").setRequired(true)
        )),
    async execute(client, interaction) {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.applicaitonsChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        const embed = new MessageEmbed()
            .setTitle("New applicaton!")
            .setDescription(`\`${interaction.options.getString("arguments")}\``)
            .setColor(`DARK_BUT_NOT_BLACK`)
            .setTimestamp()
        await client.channels.cache.get(data?.applicaitonsChannel).send({embeds: [embed]});

        interaction.reply({content: "Success!", ephemeral: true});
    }

};