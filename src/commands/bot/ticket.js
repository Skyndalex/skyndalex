const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    const info = new Discord.MessageEmbed()
        .setTitle("Jesteś pewny?")
        .setDescription("Na pewno chcesz wysłać ticket do administracji **bota**?. Pamiętaj, że nie dostaniesz odpowiedzi. Ta komenda służy do szybkiego zgłaszania błedów. Jeżeli posiadasz bardziej rozwinięty błąd, prosimy użyć komendy \`request\`.")
        .addField("Potwierdź", "Klikając reakcję 👍 potwierdzasz swoją decyzję. Natomiast klikając reakcję 👎 odmawiasz wysłanie.")
        .setColor("GREEN")
    await message.channel.send(info).then(infoReactions => {
        infoReactions.react("👍").then(() => infoReactions.react("👎"))

        const filter = (reaction, user) => {
            return ["👍", "👎"].includes(reaction.emoji.name) && user.id === message.author.id
        }
        const collector = infoReactions.createReactionCollector(filter, { time: 60000 })

        collector.on('collect', reaction => {
            if (reaction.emoji.name === '👍') {
                const embedTicket = new Discord.MessageEmbed()
                   .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                   .setDescription(args.join(" "))
                   .setColor("GREEN")
                client.channels.cache.get('854730497854406697').send(embedTicket)

                const embedValid = new Discord.MessageEmbed()
                    .setTitle("Potwierdzono.")
                    .setDescription(`Wysłałem zgłoszenie ${message.author.tag} o treści:\n${args.join(" ")||"Nie podano!"}`)
                    .setFooter("KriveBot support")
                    .setColor("GREEN")
                infoReactions.edit(embedValid)
            } else if (reaction.emoji.name === '👎') {
                const embedError = new Discord.MessageEmbed()
                    .setTitle("Odmówiono.")
                    .setDescription("Nie wysłano zgłoszenia.")
                    .setColor("RED")
                infoReactions.edit(embedError)
            }
            reaction.remove(message.author)
        });
    })

// 👎  👍
}
exports.help = {
    name: "ticket",
    description: "Klasyczne, szybie tickety na ogólny temat.",
    category: "bot",
}