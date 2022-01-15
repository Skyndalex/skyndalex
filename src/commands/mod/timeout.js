const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "timeout",
    description: "Timeout.",
    options: [
        { type: "USER", name: "user", description: "User to timeout", required: true },
        { type: "NUMBER", name: "time-in-millisecond", description: "Timeout time", required: true },
        { type: "STRING", name: "reason", description: "Timeout reason" }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});

        // soon NORMAL

        let member = interaction.options.getMember("user");
        let time = interaction.options.getNumber("time");
        let reason = interaction.options.getString("reason");

        await member.timeout(time, reason)

        let embed = new MessageEmbed()
            .setDescription(`Successfully timed out ${member.user.tag} (\`${member.user.id}\`) by ${interaction.user.tag} (\`${interaction.user.id}\`)\n**Reason:** ${reason}`)
            .setColor("ORANGE")
        await interaction.reply({ embeds: [embed] })
    }
};