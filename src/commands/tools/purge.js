const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "purge",
    description: "Clear chat.",
    options: [
        { name: "num", description: "How many messages should I delete?", required: true, type: "NUMBER" }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_MESSAGES\`", ephemeral: true});
        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: "I need permissions: \`MANAGE_MESSAGES\`"});

        let purged = interaction.options.getNumber("num");

        if (isNaN(purged)) return interaction.reply({content: "This is not a number!", ephemeral: true});
        if (purged > 100) return interaction.reply({content: 'The number given was too high!', ephemeral: true});
        if (purged < 2) return interaction.reply({content: 'The number given is too small!', ephemeral: true});

        await interaction.channel.messages.fetch({ limit: 100 }).then(messages => {
            interaction.channel.bulkDelete(messages);
            interaction.reply({content: "Success."});
        });
    }
};