const r = require("rethinkdb")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const family = await r.table("families").get(message.author.id).run(client.con)

    switch (args[0]) {
        default: 
        client.sender(message, "System rodzin", "", "", "GREEN", [
            {
                name: "> \`rodzina zaloz\`", value: "Załóż swoją rodzinę"
            },
            {
                name: "> \`rodzina usun\`", value: "Usuń rodzinę"
            },
            {
                name: "> \`rodzina slub [uzytkownik]\`", value: "Zorganizuj ślub"
            },
            {
                name: "> \`rodzina info\`", value: "Dane rodziny"
            },
            {
                name: "> \`rodzina user info [uzytkownik]\`", value: "Wyświetla informacje o użytkowniku w twojej rodzinie"
            },
            {
                name: "> \`rodzina view\`", value: "Zobacz swoją rodzine"
            },
            {
                name: "> \`rodzina set\`", value: "Zmień ustawienia swojej rodziny"
            },
            {
                name: "> \`rodzina praca\`", value: "Dołącz do pracy i rywalizuj z innymi rodzinami w topce ekonomii!"
            },
            {
                name: "> \`rodzina rynek\`", value: "Soon:tm:"
            }
        ])
        break;
        case 'zaloz':
            const familyconfirmation = new Discord.MessageEmbed()
                .setTitle("Na pewno?")
                .setDescription("Czy na pewno chcesz założyć rodzinę? Potwierdź klikając reakcję.")
                .setColor("#0af51d")
            message.channel.send(familyconfirmation).then(infoReactions => {
                infoReactions.react("👍").then(() => infoReactions.react("👎"))

                const filter = (reaction, user) => {
                    return ["👍", "👎"].includes(reaction.emoji.name) && user.id === message.author.id
                }
    
                const collector = infoReactions.createReactionCollector(filter, {time: 60000})
    
                collector.on("collect", reaction => {
                    if (reaction.emoji.name === "👍") {
                        r.table("families").insert({userid: message.author.id, family: "exists"}).run(client.con)
    
                        client.sender(message, "Pomyślnie stworzono rodzinę!", "Gratulacje! :tada:", "", "GREEN", "", "")
                    }  else if (reaction.emoji.name === '👎') {
                        const valid = new Discord.MessageEmbed()
                        .setTitle("Odmówiono")
                        .setDescription("Nie stworzyłem rodziny")
                        .setColor("GREEN")
                        infoReactions.edit(valid)
                    }
                })
            })
            break;   
            case 'set':
                client.sender(message, "", "Aby przejść do konfiguracji rodziny użyj komendy: \`familyset\`", "", "#0af5ce", "", "")
                break;
                case 'slub':
                    if (family?.family) message.channel.send("Nie masz rodziny!")

                    const user = args.slice(1).join(" ")
                    if (!user) return client.sender(message, "Błąd!", "Nie podałeś użytkownika!", "", "RED", "", "")
       
                    r.table("families").update({partner: user}).run(client.con)

                    message.channel.send(`GRATULACJEE! Pomyślnie wziąłeś ślub z użytkownikiem ${user}!`)
                    break;
                    case 'praca':
                        if (!family?.family) message.channel.send("Nie masz rodziny!")

                        const familywork = new Discord.MessageEmbed()
                        .setTitle("Wybierz pracę")
                        .setDescription("[Zobacz tutaj](https://docs.krivebot.xyz/families) jak to zrobić.")
                        .addField("robotnik", "Wynagr: 50-100zł")
                        .addField("budowniczy", "Wynagr: 20-70zł")
                        .addField("developer", "Wynagr: 100-150zł")
                        .addField("pilot", "Wynagr: 150-210zł")
                        .addField("sprzedawca", "Wynagr: 10-50zł")
                        .setTimestamp()
                        .setThumbnail("https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec")
                        .setColor("GREEN")
                        message.channel.send(familywork)
                        break;
                case 'view':
                    const msgembed = new Discord.MessageEmbed()
                    if (!family?.family) return message.channel.send("Nie masz rodziny!")
                    .setTitle("Dane rodziny")
                    if (!family?.family) msgembed.addField("Błąd", "Bot nie mógł znaleźć żadnych informacji o rodzinie!")
                    if (family?.familyname) msgembed.addField("Nazwa rodziny", family.familyname)
                    if (family?.familydesc) msgembed.addField("Opis rodziny", family.familydesc)
                    if (family?.partner) msgembed.addField(`Partnerzy`, `${message.author.tag} + ${family.partner}`)
                    .addField("Właściciel", `${message.author.tag}`)
                    .setColor("GREEN")
                    message.channel.send(msgembed)
                    break;
    }
}
    exports.help = {
        name: "rodzina",
        description: "Załóż rodzinę!",
        category: "fun"
    }