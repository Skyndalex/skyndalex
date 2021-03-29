exports.run = async (client, message, args) => {
    const Discord = require('discord.js-light')
    let embed = new Discord.MessageEmbed()
        .setTitle("Pomoc")
        .addField(`Bot`, `> \`\`\`${client.commands.filter(c => c.help.category==="bot").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
        .addField(`Zabawa`, `> \`\`\`${client.commands.filter(c => c.help.category==="fun").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
        .addField(`Moderacja`, `> \`\`\`${client.commands.filter(c => c.help.category==="moderation").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
        .addField(`Narzędzia`, `> \`\`\`${client.commands.filter(c => c.help.category==="tools").map(c => c.help.name).join(" | ")||"Brak"}\`\`\``)
        .setURL(client.url)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "help",
    description: "Pomoc",
    category: "bot",
    aliases: ["h", "pomoc", "halp"]
}