const Discord = require("discord.js")
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    switch(args[0]) {
        case 'encode':
            if (!args[1]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

            const binarytext = await fetch(`https://some-random-api.ml/binary?text=${encodeURIComponent(args.slice(1).join(" "))}`).then(response => response.json()).catch((err) => {
                client.error(message, `Wystąpił błąd! ${err}`)
            })
            const embed2 = new Discord.MessageEmbed()
                .addField("Tekst", args.slice(1).join(" "))
                .addField("Zakodowano", binarytext.binary)
                .setColor("GREEN")
            message.channel.send(embed2)
            break;
        case 'decode':
            if (!args[1]) return client.error(message, "Nie podano argumentów")

            const binaryTextDecode = await fetch(`https://some-random-api.ml/binary?decode=${encodeURIComponent(args.slice(1).join(" "))}`).then(response => response.json()).catch((err) => {
                client.error(message, `Wystąpił błąd! ${err}`)
            })
            const embed3 = new Discord.MessageEmbed()
                .addField("Tekst", args.slice(1).join(" "))
                .addField("Odkodowano", binaryTextDecode.text)
                .setColor("GREEN")
            message.channel.send(embed3)
            break;
        default:
            const embed = new Discord.MessageEmbed()
                .setTitle("Tłumaczenie na kod binarny")
                .setDescription("Użycie komendy: \`binary [zmienna]\`")
                .addField("> \`binary encode\`", "Odkoduj tekst")
                .addField("> \`binary decode\`", "Odkoduj tekst")
                .setColor("GREEN")
            message.channel.send(embed)


    }
}
exports.help = {
    name: "binary",
    description: "lol",
    category: "fun"
}