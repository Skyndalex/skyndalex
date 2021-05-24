const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldGuild, newGuild) => {
    const logChannel = await r.table("settings").get(newGuild.guild.id)("guildUpdateLog").run(client.con)
    let regions = {
        "europe": "Europa",
        "eu-west": "Europa zachodnia",
        "eu-central": "Europa centralna",
        "brazil": "Brazylia",
        "hongkong": "Hongkong",
        "india": "Indie",
        "japan": "Japonia",
        "russia": "Rosja",
        "singapore": "Singapur",
        "southafrica": "Afryka południowa",
        "sydney": "Sydney",
        "us-central": "USA centralne",
        "us-east": "USA wschodnie",
        "us-south": "USA południowe",
        "us-west": "USA zachodnie"
    }
    let ver = {
        "NONE": "Żaden",
        "LOW": "Niski",
        "MEDIUM": "Średni",
        "HIGH": "Wysoki",
        "VERY-HIGH": "Najwyższy"
    }
    const logEmbed = new Discord.MessageEmbed()
        .setTitle("Edytowano serwer")
        .addField("Nazwa serwera przed", oldGuild.name)
        .addField("Nazwa serwera po", newGuild.name)
        .addField("Kanał afk przed", oldGuild.afkChannel)
        .addField("Kanał afk po", newGuild.afkChannel)
        .addField("Maksymalny czas bycia afk przed (sekundy)", oldGuild.afkTimeout)
        .addField("Maksymalny czas bycia afk po (sekundy)", newGuild.afkTimeout)
        .addField("Region przed", regions[oldGuild.region])
        .addField("Region po", regions[newGuild.region])
        .addField("Kanał systemowy przed", oldGuild.systemChannel)
        .addField("Kanał systemowy po", newGuild.systemChannel)
        .addField("Customowy kod zaproszeń przed", oldGuild.vanityURLCode)
        .addField("Customowy kod zaproszeń po", newGuild.vanityURLCode)
        .addField("Poziom weryfikacji przed", ver[oldGuild.verificationLevel])
        .addField("Poziom weryfikacji po", ver[newGuild.verificationLevel])
newGuild.channels.cache.get(logChannel).send(logEmbed)
}