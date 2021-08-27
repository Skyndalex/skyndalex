const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "guildCreate",
    once: false,

    execute(client) {
        const channel = client.channels.cache.get("878604193059983391")

        const embed = new MessageEmbed()
            .setDescription(`Dodano bota na serwer! **Krive** posiada już ${client.guilds.cache.size} serwerów!`)
            .setColor("#03adfc")
        channel.send({ embeds: [embed] })
    }
}