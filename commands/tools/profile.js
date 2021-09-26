// @formatter: off
// todo: objects
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const r = require("rethinkdb");
const {use} = require("express/lib/router");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Ustaw swój profil w bocie!')
        .addStringOption(option => (
            option.setName("name").setDescription("Nazwa profilu")
        )).addStringOption(option => (
            option.setName("description").setDescription("Opis profilu")
        )).addStringOption(option => (
            option.setName("email").setDescription("Adres E-mail")
        )).addStringOption(option => (
            option.setName("birthday").setDescription("Urodziny")
        )).addStringOption(option => (
            option.setName("discord").setDescription("Serwer Discord")
        )).addStringOption(option => (
            option.setName("facebook").setDescription("Profil Facebook")
        )).addStringOption(option => (
            option.setName("youtube").setDescription("Kanał na Youtube")
        )).addStringOption(option => (
            option.setName("twitter").setDescription("Profil twitter")
        )).addStringOption(option => (
            option.setName("twitch").setDescription("Kanał twitch")
        )).addStringOption(option => (
            option.setName("reddit").setDescription("Profil na reddit")
        )).addUserOption(option => (
            option.setName("view").setDescription("Zobacz profil")
        )),
    async execute(client, interaction) {

        if (interaction.options.getString("name")) {
            await r.table("users").insert({ userid: interaction.user.id, profileName: interaction.options.getString("name")}).run(client.con)
            await r.table("users").get(interaction.user.id).update({ profileName: interaction.options.getString("name")}).run(client.con)

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Nazwa", value: interaction.options.getString("name") }])
        } else if (interaction.options.getString("description")) {
           await r.table("users").insert({ userid: interaction.user.id, profileDesc: interaction.options.getString("description")}).run(client.con);
           await r.table("users").get(interaction.user.id).update({ profileDesc: interaction.options.getString("description")}).run(client.con);

           client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Opis", value: interaction.options.getString("description") }])
        } else if (interaction.options.getString("email")) {
            await r.table("users").insert({ userid: interaction.user.id, profileEmail: interaction.options.getString("email")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileEmail: interaction.options.getString("email")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Adres E-mail", value: interaction.options.getString("email") }])
        } else if (interaction.options.getString("birthday")) {
            await r.table("users").insert({ userid: interaction.user.id, profileBirthday: interaction.options.getString("birthday")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileBirthday: interaction.options.getString("birthday")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Urodziny", value: interaction.options.getString("birthday") }])
        } else if (interaction.options.getString("discord")) {
            await r.table("users").insert({ userid: interaction.user.id, profileDiscord: interaction.options.getString("discord")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileDiscord: interaction.options.getString("discord")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Discord", value: interaction.options.getString("discord") }])
        } else if (interaction.options.getString("facebook")) {
            await r.table("users").insert({ userid: interaction.user.id, profileFacebook: interaction.options.getString("facebook")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileFacebook: interaction.options.getString("facebook")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "facebook", value: interaction.options.getString("facebook") }])
        } else if (interaction.options.getString("youtube")) {
            await r.table("users").insert({ userid: interaction.user.id, profileYoutube: interaction.options.getString("youtube")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileYoutube: interaction.options.getString("youtube")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Youtube", value: interaction.options.getString("youtube") }])
        } else if (interaction.options.getString("twitter")) {
            await r.table("users").insert({ userid: interaction.user.id, profileTwitter: interaction.options.getString("twitter")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileTwitter: interaction.options.getString("twitter")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Twitter", value: interaction.options.getString("twitter") }])
        } else if (interaction.options.getString("twitch")) {
            await r.table("users").insert({ userid: interaction.user.id, profileTwitch: interaction.options.getString("twitch")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileTwitch: interaction.options.getString("twitch")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Twitch", value: interaction.options.getString("twitch") }])
        } else if (interaction.options.getString("reddit")) {
            await r.table("users").insert({ userid: interaction.user.id, profileReddit: interaction.options.getString("reddit")}).run(client.con);
            await r.table("users").get(interaction.user.id).update({ profileReddit: interaction.options.getString("reddit")}).run(client.con);

            client.builder(interaction, ``, `Zaktualizowano dane w profilu!`, `Profile`, `GREEN`, [{ name: "Reddit", value: interaction.options.getString("reddit") }])
        } else if (interaction.options.getUser("view")) {
            const userProfile = await r.table("users").get(interaction.user.id).run(client.con);
            if (!userProfile) client.builder(interaction, "Błąd!", "Nie znaleziono użytkownika w bazie danych!", "Profile", "RED", "", "")

            const embed = new MessageEmbed()
                .setDescription(`Profil użytkownika ${interaction.user.tag}`)
                .setColor("GREEN")
                if (userProfile.profileName) embed.addField("Nazwa profilu", userProfile.profileName)
                if (userProfile.profileDesc) embed.addField("Opis profilu", userProfile.profileDesc)
                if (userProfile.profileBirthday) embed.addField("Urodziny", userProfile.profileBirthday)
                if (userProfile.profileEmail) embed.addField("Adres E-mail:", userProfile.profileEmail)
                if (userProfile.profileFacebook) embed.addField("Profil Facebook", userProfile.profileFacebook)
                if (userProfile.profileDiscord) embed.addField("Serwer Discord", userProfile.profileDiscord)
                if (userProfile.profileTwitch) embed.addField("Twitch", userProfile.profileTwitch)
                if (userProfile.profileTwitter) embed.addField("Twitter", userProfile.profileTwitter)
                if (userProfile.profileYoutube) embed.addField("Youtube", userProfile.profileYoutube)
            interaction.reply({ embeds: [embed]})
        } else {
            interaction.reply({content: "Nic nie podałeś!", ephemeral: true})
        }
    }
};