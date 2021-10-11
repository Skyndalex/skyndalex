const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const os = require("os");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('linki')
        .setDescription('Linki'),

    async execute(client, interaction) {
        client.builder(interaction, "", "**Linki**\n\n[\`Discord\`](https://krivebot.xyz/dicord)\n[\`GitHub\`](https://krivebot.xyz/github)\n[\`Invite\`](https://krivebot.xyz/invite)\n[\`Twitter\`](https://krivebot.xyz/twitter)\n[\`GH Projects\`](https://krivebot.xyz/todo)\n[\`Dokumentacja\`](https://docs.krivebot)\n[\`Status\`](https://status.krivebot.xyz)", `Linki`, `GREEN`, ``)
    }
};
