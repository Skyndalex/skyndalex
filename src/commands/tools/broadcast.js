const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    name: "broadcast",
    description: "Send broadcast.",
    options: [
        { type: "STRING", name: "arguments", description: "Broadcast description", required: true }
    ],

    run: async (client, interaction) => {
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