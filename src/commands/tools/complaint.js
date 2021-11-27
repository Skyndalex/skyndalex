const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('complaint')
        .setDescription('Complaints.')
        .addUserOption(option => (
            option.setName("user").setDescription("User").setRequired(true)
        )).addStringOption(option => (
            option.setName("reason").setDescription("Reason")
        )),
    async execute(client, interaction) {
        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.complaintsChannel) return interaction.reply({content: client.strings.tools.info_nosetting});


        let user = interaction.options.getUser("user");

        const embed = new MessageEmbed()
            .setTitle("New complaint")
            .addField(`By`, `${interaction.user.tag}(${interaction.user.id})`)
            .addField(`User reported`, `${user}(${user.id})`)
            .addField(`Reason`, `${interaction.options.getString("reason") || "None"}`)
        await client.channels.cache.get(data?.complaintsChannel).send({embeds: [embed]}).then(async message => {
            await message.startThread({
                name: 'Complaint discussion.',
                autoArchiveDuration: 1440, // hours
                reason: client.strings.tools.thread_reason,
            })
        })
        interaction.reply({content: "Success!", ephemeral: true})
    }
};