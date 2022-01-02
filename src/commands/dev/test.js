const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test ok'),
    async execute(client, interaction) {
        if (!client.application?.owner) await client.application?.fetch();

        const settings = await r.table("settings").get(interaction.guild.id).run(client.con);

        const command = client.application?.commands.fetch(interaction.commandId);

        const permissions = [
            {
                id: settings.adminRole,
                type: "ROLE",
                permission: true
            },
            {
                id: settings.userRole,
                type: "ROLE",
                permission: false
            }
        ]
        await command.permissions.add({ permissions });
    }
};
