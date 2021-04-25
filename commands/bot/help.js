const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let commandsf = [
        "set",
        "8ball",
        "ship",
        "work",

    ]
    const embed = new Discord.MessageEmbed()
        .setTitle(`Pomoc (${client.commands.size})`)
        .setDescription(`Potrzebujesz pomocy? Wejdź na nasz [support](${client.url}/discord)\nPotrzebujesz pomocy z ustawianiem? Zobacz naszą [dokumentację](https://docs.krivebot.xyz)`)
        .addField(`Bot`, `> \`${client.commands.filter(c => c.help.category==="bot").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField(`Zabawa`, `> \`${client.commands.filter(c => c.help.category==="fun").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField(`Moderacja`, `> \`${client.commands.filter(c => c.help.category==="moderation").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField(`Narzędzia`, `> \`${client.commands.filter(c => c.help.category==="tools").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField(`Zarządzanie botem`, `> \`\`${client.commands.filter(c => c.help.category==="developers").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField(`Ekonomia`, `> \`${client.commands.filter(c => c.help.category==="economy").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .addField("Zarządzanie kanałami VC", `> \`${client.commands.filter(c => c.help.category==="vcmanagement").map(c => c.help.name).join(" | ")||"Brak"}\``)
        .setColor("GREEN")
        .setFooter(`KriveBot team poleca komende ${commandsf.random()}`)
    message.channel.send(embed)
}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}