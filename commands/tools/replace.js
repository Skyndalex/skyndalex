const Discord = require("discord.js-light")
exports.run = async (client, message, args) => {
     message.channel.send("Wszystkie komendy które wymagają dodatkowe uprawnienia działają od poziomu właściciela serwera (tymczasowo)! Przepraszamy!")
     if (!message.member.hasPermission('MANAGE_CHANNELS')) return client.errorBuilder(message, `Nie masz permisji! `);


    const kl = []
    message.guild.channels.cache.forEach(k => {
        if (!k.name.includes("-")) return
        const g = k.name.replace("-", "ˑ")
        k.setName(g)
        kl.push(g)
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