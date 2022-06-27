const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetch } = require("undici");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command"),
    async execute(client, interaction) {
        await interaction.guild.members.fetch()
        console.log(client.users.cache.size)

      let nameList = await interaction.guild.roles.cache.get('943888111618887700').members.map(m => m.setNickname("m"));
    }
}