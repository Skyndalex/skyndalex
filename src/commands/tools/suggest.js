const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggestion.')
        .addStringOption(option => (
            option.setName("arguments").setDescription("Suggestion description").setRequired(true)
        )),
    async execute(client, interaction) {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.suggestionsChannel) return interaction.reply({content: "The suggestions channel has not been set! Use the \`/set\` command to do this. "});

        const embed = new MessageEmbed()
            .setDescription(`${interaction.options.getString("arguments")}`)
            .setFooter(`\`Suggestion posted by: ${interaction.user.tag}(${interaction.user.id})\``)
            .setColor("DARK_BUT_NOT_BLACK")
        await client.channels.cache.get(data?.suggestionsChannel).send({embeds: [embed]}).then(message => {
            message.startThread({
                name: 'Suggestion discussion.',
                autoArchiveDuration: 1440,
                reason: 'New suggestion',
            })

        })
    }
};