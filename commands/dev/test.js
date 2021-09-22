const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test ok'),
    async execute(client, interaction) {
        if (!client.application?.owner) await client.application?.fetch();
        const command = client.application?.commands.fetch(interaction.commandId);

        const permissions = [
            {
                id: "817883855310684180", // id właściciela bota
                type: "USER",
                permission: true,
            },
            {
                id: interaction.guild.id,
                type: 'ROLE',
                permission: false,
            },
        ];

        await command.permissions.add({ permissions });

       // console.log("test");
    }
};
