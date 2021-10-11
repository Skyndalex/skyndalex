const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skarga')
        .setDescription('Wyślij skargę.')
        .addUserOption(option => (
            option.setName("user").setDescription("Użytkownik, na którego chcesz złożyć skargę.").setRequired(true)
        )).addStringOption(option => (
            option.setName('reason').setDescription("Powód skargi.")
        )),
    
    async execute(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const channel = await r.table("settings").get(interaction.guild.id).run(client.con)

        if (!channel?.complaintChannel) return interaction.reply({ content: "Właściciel nie ustawił kanału do skarg!", ephemeral: true });

        if (interaction.options.getUser("user")) {
            if (interaction.options.getString("reason")) {
                const embed = new MessageEmbed()
                    .setDescription(`**Nowa skarga**\n\nZgłoszony użytkownik: ${user}\nPowód: ${reason || "Nie podano" }`)
                    .setColor("GREEN")
                client.channels.cache.get(channel.complaintChannel).send({embeds: [embed]})

                await interaction.reply({content: `Wysłano skargę na użytkownika ${user.tag}!\nPowód: ${reason}\nWysłano na kanał: <#${channel.complaintChannel}>`, ephemeral: true})
            }
        }
    }
};