// logs [For Safety :)] 
const { MessageEmbed } = require("discord.js")

module.exports = async(client, guild) => {
     const embed = new MessageEmbed()
     .setTitle("Dodano do serwera")
     .addField("Nazwa", guild.name)
     .addField("ID", guild.id)
     .setColor("YELLOW")
     client.channels.cache.get("868522685800546325").send(embed)
}