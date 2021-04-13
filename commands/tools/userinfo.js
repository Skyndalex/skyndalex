const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
   const user = message.mentions.users.first()
    let userStatus = {
        online: "Dostępny",
        offline: "Niedostępny",
        idle: "Zaraz wracam",
        dnd: "Nie przeszkadzać"
    }

    let bot = {
       true: "Jest botem",
       false: "Nie jest botem"
    }
    const member = message.guild.members.cache.get(user.id)
    const embed = new Discord.MessageEmbed()
        .setTitle("Informacje o użytkowniku")
        .addField("Nazwa użytkownika", user.username)
        .addField("ID użytkownika", user.id)
        .addField("Pełna nazwa użytkownika", user.tag)
        .addField("Status", userStatus)
        .addField("Czy jest botem?", bot[user.bot])
        .addField("Lista ról, które posiada użytkownik", `\`${member.roles.cache.map(r => r.name).join(" | ")}\``)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "userinfo",
    description: "Informacje o użytkowniku",
    category: "tools",
}