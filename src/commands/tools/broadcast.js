const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('broadcast')
        .setDescription('broadcast.')
        .addStringOption(option => (
           option.setName("arguments").setDescription("Broadcast description").setRequired(true)
        )),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`!", ephemeral: true});

        const data = await r.table("settings").get(interaction.guild.id).run(client.con);
        if (!data?.broadcastChannel) return interaction.reply({content: client.strings.tools.info_nosetting});

        const embed = new MessageEmbed()
            .setDescription(`\`${interaction.options.getString("arguments")}\``)
            .setColor(`DARK_BUT_NOT_BLACK`)
            .setTimestamp()
        await client.channels.cache.get(data?.broadcastChannel).send({embeds: [embed]}).then(async message => {
            await message.startThread({
                name: 'Announcement discussion.',
                autoArchiveDuration: 1440, // hours
                reason: client.strings.tools.thread_reason
            })
        })
        interaction.reply({content: "Success!", ephemeral: true});

    }

};