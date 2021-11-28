const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Start voting.')
        .addStringOption(option => (
            option.setName("arguments").setDescription("Voting description").setRequired(true)
        )),
    async execute(client, interaction) {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.voteChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        const embed = new MessageEmbed()
            .setTitle("New voting!")
            .setDescription(`\`${interaction.options.getString("arguments")}\``)
            .setColor(`DARK_BUT_NOT_BLACK`)
            .setTimestamp()
        await client.channels.cache.get(data?.voteChannel).send({embeds: [embed]}).then(r => {
            r.react("👍")
            r.react("👎")
        });

        interaction.reply({content: "Success!", ephemeral: true});
    }

};