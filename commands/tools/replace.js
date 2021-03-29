const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
     if (!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, `Nie masz permisji! `);


    message.guild.channels.cache.forEach(k => {
        if (!k.name.includes("-")) return
        const g = k.name.replace("-", "ˑ")
        k.setName(g)
    });
    let embed = new Discord.MessageEmbed()
        .setDescription("Pomyślnie zamieniłem znak \`-\` we wszystkich nazwach kanału!")
        .setColor("GREEN")
    message.channel.send(embed)

}
exports.help = {
    name: "replace",
    description: "Zamienia znak - w nazwie kanałów",
    category: "tools",
    aliases: ["czysc", "kasuj"]
}