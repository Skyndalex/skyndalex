exports.run = async (client, message, args) => {
    /*
    const guild = client.guilds.cache.get(args[0])||message.guild

    switch(args[2]) {
        case 'add':
            return message.channel.send("test")
            break;
    }
    switch(args[1]) {
        case 'name':
            if (!args[2]) return client.error(message, "Nie podałeś argumentów!");
            const myShopName = args.slice(2).join(" ")

            r.table("ServerEconomy").update({shopName: myShopName}).run(client.con)

            const myShopNameConfig = new Discord.MessageEmbed()
                .setTitle("Skonfigurowano nazwę sklepu")
                .addField("Nowa nazwa", myShopName)
                .addField("Nazwe utworzył", message.author.tag)
                .setColor("GREEN")
            return message.channel.send(myShopNameConfig)
            break;

        case 'description':
            if (!args[2]) return client.error(message, "Nie podano argumentów!")
            const myShopDesc = args.slice(2).join(" ")

            r.table("ServerEconomy").update({shopDesc: myShopDesc}).run(client.con)

            const myShopDescConfig = new Discord.MessageEmbed()
                .setTitle("Skonfigurowano opis sklepu")
                .addField("Nowy opis", myShopDesc)
                .addField("Nazwę utworzył", message.author.tag)
                .setColor("GREEN")
           return message.channel.send(myShopDescConfig)
        case 'items':
            const items = new Discord.MessageEmbed()
                .setTitle("Itemy dodane przez ciebie")
                .setDescription("Brak itemów!\nDodaj je za pomocą komendy \`shop config items add/remove\`")
                .setColor("GREEN")
            return message.channel.send(items)
        break;
    }
    switch (args[0]) {
        case 'config':
            const config = new Discord.MessageEmbed()
                .setTitle(`Konfigurator sklepu dla serwera ${guild.name}`)
                .setDescription("Aby ustawić wartość, poruszaj się podanymi komendami ZWYKŁYMI wiadomościami.\nOdnośnik do dokumentacji")
                .addField("> \`shop config name\`", "Konfiguracja nazwy sklepu")
                .addField("> \`shop config description\`", "Konfiguracja opisu sklepu")
                .addField("> \`shop config items add/remove\`", "Konfiguracja itemów")
                .addField("> \`shop config prices [ID itemu/nazwa/część nazwy] [cena]\`", "Konfiguracja ceny przedmiotu")
                .setFooter(client.footer)
                .setColor("GREEN")
           return message.channel.send(config)
            break;
        case 'items':
            const embedItems = new Discord.MessageEmbed()
                .setTitle("Itemy na serwerze")
                .addField("Brak itemów", "Brak kosztów")
                .setColor("GREEN")
            return message.channel.send(embedItems)
        case 'prices':
            const pricesItemsEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawianie ceny itemów")
                .addField("Dodawanie ceny", "\`shop prices add [id itemku] [nowa cena]\`")
                .addField("Informacje", "Użyj \`shop prices add\` po więcej informacji.")
                .setColor("GREEN")
            return message.channel.send(pricesItemsEmbed)
        break;
        default:
            const myShopNameFromConfig = await r.table("ServerEconomy").get(message.guild.id).pluck("shopName").run(client.con)
            console.log(myShopNameFromConfig)
            const help = new Discord.MessageEmbed()
                .setTitle("Nowy konfigurator sklepów")
                .setDescription("Aby ustawić sklep wpisz \`shop config\`.\nNatomiast ceny itemków znajdziesz pod komendą \`shop prices\`")
                .addField("Nazwa sklepiku", `> ${myShopNameFromConfig||"\`Nie ustawiono opisu sklepu\`"}`)
                .addField("Opis sklepiku", "> \`Nie ustawiono opisu sklepu!\`")
                .addField("Itemy", "> \`shop items\`")
                .setFooter(client.economyFooter)
                .setColor("GREEN")
            message.channel.send(help)
            break;

    }

     */
    message.channel.send("SoonTM")
}

exports.help = {
    name: "shop",
    aliases: ["pracuj"],
    category: "economy",
}