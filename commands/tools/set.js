// @formatter: off
// todo: objects
const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Ustawienia serwerowe.')
        .addChannelOption(option => (
            option.setName("ogłoszenia").setDescription("Kanał ogłoszeniowy")
        )).addChannelOption(option => (
            option.setName('głosowania').setDescription("Kanał głosowań")
        )).addChannelOption(option => (
            option.setName("skargi").setDescription("Kanał skarg")
        )).addChannelOption(option => (
            option.setName("obrazki").setDescription("Kanał obrazkowy")
        )).addChannelOption(option => (
            option.setName("powitania").setDescription("Kanał powitań")
        )).addChannelOption(option => (
            option.setName("pożegnania").setDescription("Kanał pożegnań")
        )).addChannelOption(option => (
            option.setName("sugestie").setDescription("Kanał sugestii")
        )).addChannelOption(option => (
            option.setName("podania").setDescription("Kanał podań")
        )).addRoleOption(option => (
            option.setName("moderatorrole").setDescription("Rola moderacji")
        )).addRoleOption(option => (
            option.setName("mutedrole").setDescription("Rola wyciszonego")
        )),


    async execute(client, interaction) {
        // (opcje opcjonalne)
        if (interaction.options.getChannel("ogłoszenia")) {
            if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

            const channel = await interaction.options.getChannel("ogłoszenia");

            await r.table("settings").insert({ id: interaction.guild.id, broadcastChannel: channel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, broadcastChannel: channel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${channel.id}> (broadcastChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("skargi")) {
            const complaintchannel = await interaction.options.getChannel("skargi");

            await r.table("settings").insert({ id: interaction.guild.id, complaintChannel: complaintchannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, complaintChannel: complaintchannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${complaintchannel.id}> (complaintChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("obrazki")) {
            const imagechannel = await interaction.options.getChannel("obrazki");

            await r.table("settings").insert({ id: interaction.guild.id, imageChannel: imagechannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, imageChannel: imagechannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${imagechannel.id}> (imageChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("powitania")) {
            const welcomechannel = await interaction.options.getChannel("powitania");

            await r.table("settings").insert({ id: interaction.guild.id, welcomeChannel: welcomechannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, welcomeChannel: welcomechannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${welcomechannel.id}> (welcomeChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("pożegnania")) {
            const goodbyechannel = await interaction.options.getChannel("pożegnania")

            await r.table("settings").insert({ id: interaction.guild.id, goodbyeChannel: goodbyechannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, goodbyeChannel: goodbyechannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${goodbyechannel.id}> (goodbyeChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("sugestie")) {
            const suggestionchannel = await interaction.options.getChannel("sugestie");

            await r.table("settings").insert({ id: interaction.guild.id, suggestionChannel: suggestionchannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, suggestionChannel: suggestionchannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${suggestionchannel.id}> (suggestionChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("podania")) {
            const applicationchannel = await interaction.options.getChannel("podania");

            await r.table("settings").insert({ id: interaction.guild.id, applicationChannel: applicationchannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, applicationChannel: applicationchannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${applicationchannel.id}> (applicationChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getChannel("głosowania")) {
            const votechannel = await interaction.options.getChannel("głosowania");

            await r.table("settings").insert({ id: interaction.guild.id, voteChannel: votechannel.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, voteChannel: votechannel.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nKanał: <#${votechannel.id}> (voteChannel)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        } else if (interaction.options.getRole("moderatorrole")) {
            const moderatorRole = await interaction.options.getRole("moderatorrole");

            await r.table("settings").insert({ id: interaction.guild.id, moderatorRole: moderatorRole.id}).run(client.con);
            await r.table("settings").update({ id: interaction.guild.id, moderatorRole: moderatorRole.id }).run(client.con);

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nRola: <@&${moderatorRole.id}> (moderatorRole)\nAutor: ${interaction.user.tag}`, `Ustawienia`, `#34ebb7`, ``, ``)
        }
    }

};