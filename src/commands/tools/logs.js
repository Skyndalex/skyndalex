// @formatter: off
const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Ustawienia logów.')
        .addChannelOption(option => (
            option.setName("channelcreate").setDescription("Logi tworzenia kanałów.")
        )).addChannelOption(option => (
            option.setName("channeldelete").setDescription("Logi usuwania kanału.")
        )).addChannelOption(option => (
            option.setName("channelupdate").setDescription("Logi aktualizowania kanału/")
        )).addChannelOption(option => (
            option.setName("emojicreate").setDescription("Logi tworzenia emoji")
        )).addChannelOption(option => (
            option.setName("emojiupdate").setDescription("Logi aktualizowania emoji")
        )).addChannelOption(option => (
            option.setName("emojidelete").setDescription("Logi usunięcia emoji")
        )).addChannelOption(option => (
            option.setName("messagedelete").setDescription("Logi usuwania wiadomości")
        )).addChannelOption(option => (
            option.setName("rolecreate").setDescription("Logi tworzenia roli")
        )).addChannelOption(option => (
            option.setName("roleupdate").setDescription("Logi aktualizowania emoji")
        )).addChannelOption(option => (
            option.setName("roledelete").setDescription("Logi usuwania emoji")
        )),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

        if (interaction.options.getChannel("channelcreate")) {
            const channelCreate = await interaction.options.getChannel("channelcreate");

            await r.table("logs").insert({ id: interaction.guild.id, channelCreate: channelCreate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, channelCreate: channelCreate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${channelCreate.id}> (${channelCreate.name})`)
        } else if (interaction.options.getChannel("channeldelete")) {
            const channelDelete = await interaction.options.getChannel("channeldelete");

            await r.table("logs").insert({ id: interaction.guild.id, channelDelete: channelDelete.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, channelDelete: channelDelete.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${channelDelete.id}> (${channelDelete.name})`)
        } else if (interaction.options.getChannel("channelupdate")) {
            const channelupdate = await interaction.options.getChannel("channelupdate");

            await r.table("logs").insert({ id: interaction.guild.id, channelUpdate: channelupdate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, channelUpdate: channelupdate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${channelupdate.id}> (${channelupdate.name})`)
        } else if (interaction.options.getChannel("emojicreate")) {
            const emojiCreate = await interaction.options.getChannel("emojicreate");

            await r.table("logs").insert({ id: interaction.guild.id, emojiCreate: emojiCreate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, emojiCreate: emojiCreate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${emojiCreate.id}> (${emojiCreate.name})`)
        } else if (interaction.options.getChannel("emojidelete")) {
            const emojiDelete = await interaction.options.getChannel("emojidelete");

            await r.table("logs").insert({ id: interaction.guild.id, emojiDelete: emojiDelete.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, emojiDelete: emojiDelete.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${emojiDelete.id}> (${emojiDelete.name})`)
        } else if (interaction.options.getChannel("emojiupdate")) {
            const emojiUpdate = await interaction.options.getChannel("emojiupdate");

            await r.table("logs").insert({ id: interaction.guild.id, emojiUpdate: emojiUpdate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, emojiUpdate: emojiUpdate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${emojiUpdate.id}> (${emojiUpdate.name})`)
        } else if (interaction.options.getChannel("messagedelete")) {
            const messageDelete = await interaction.options.getChannel("messagedelete");

            await r.table("logs").insert({ id: interaction.guild.id, messageDelete: messageDelete.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, messageDelete: messageDelete.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${messageDelete.id}> (${messageDelete.name})`)
        } else if (interaction.options.getChannel("rolecreate")) {
            const roleCreate = await interaction.options.getChannel("rolecreate");

            await r.table("logs").insert({ id: interaction.guild.id, roleCreate: roleCreate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, roleCreate: roleCreate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${roleCreate.id}> (${roleCreate.name})`)
        } else if (interaction.options.getChannel("roleupdate")) {
            const roleUpdate = await interaction.options.getChannel("roleupdate");

            await r.table("logs").insert({ id: interaction.guild.id, roleUpdate: roleUpdate.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, roleUpdate: roleUpdate.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${roleUpdate.id}> (${roleUpdate.name})`)
        } else if (interaction.options.getChannel("roledelete")) {
            const roleDelete = await interaction.options.getChannel("roledelete");

            await r.table("logs").insert({ id: interaction.guild.id, roleDelete: roleDelete.id }).run(client.con)
            await r.table("logs").update({ id: interaction.guild.id, roleDelete: roleDelete.id }).run(client.con)

            client.ephemeral(interaction, ``, `**Ustawiono!**\n\nAutor: ${interaction.user.tag}\nKanał: <#${roleDelete.id}> (${roleDelete.name})`)
        } else {
            interaction.reply("Nic nie podałeś! Wybierz z opcji (/)")
        }
    }
};