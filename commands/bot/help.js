exports.run = async (client, message, args) => {
    const Discord = require('discord.js-light')
    let embed = new Discord.MessageEmbed()
        .setTitle(`Pomoc (${client.commands.size})`)
        .addField(`Bot`, `> \`\`${client.commands.filter(c => c.help.category==="bot").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
        .addField(`Zabawa`, `> \`\`${client.commands.filter(c => c.help.category==="fun").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
        .addField(`Moderacja`, `> \`\`${client.commands.filter(c => c.help.category==="moderation").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
        .addField(`Narzędzia`, `> \`\`${client.commands.filter(c => c.help.category==="tools").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
        .addField(`Zarządzanie botem`, `> \`\`${client.commands.filter(c => c.help.category==="developers").map(c => c.help.name).join(" | ")||"Brak"}\`\``)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}