const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linki')
        .setDescription('Linki'),

    async execute(client, interaction) {
        client.builder(interaction, "", "**Linki**\n\n[\`Discord\`](https://discord.gg/yB3UHCSK4n)\n[\`GitHub\`](https://github.com/Skyndalex/skyndalex)\n[\`Invite\`](https://discord.com/oauth2/authorize?client_id=836529470122622986&permissions=0&scope=bot%20applications.commands)\n[\`GH Projects\`](https://github.com/Skyndalex/skyndalex/projects/4)\n[\`Dokumentacja\`](https://docs.krivebot.xyz)\n[\`Status\`](https://status.krivebot.xyz)", `Linki`, `#2f3136`, ``)
    }
};
