const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Settings")
        .addRoleOption(option => (
           option.setName("moderator_role").setDescription("Moderator role")
        )),
    async execute(client, interaction) {
        for (let option of interaction.options.data) {
            switch (option.name) {
                case "moderator_role":
                    const role = await interaction.options.getRole("moderator_role");

                    await r.table("settings").insert({ id: interaction.guild.id, moderatorRole: role.id }).run(client.con);
                    await r.table("settings").get(interaction.guild.id).update({ id: interaction.guild.id, moderatorRole: role.id }).run(client.con);

                    const embedModerator_Role = new MessageEmbed()
                        .setTitle("Successfully set!")
                        .setDescription(`Selected option: \`${option.name}\``)
                        .addField(`New value`, `<#${role.id}>`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    interaction.reply({embeds: [embedModerator_Role]})
                    break;
                }
            }
        }
};