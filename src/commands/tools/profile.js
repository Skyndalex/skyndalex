const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const myProfile = await r.table('profiles').get(message.author.id).run(client.con)
    switch(args[0]) {
        case 'deactivate':
            if(!myProfile) await r.table('profiles').insert({id: message.author.id, activate: false}).run(client.con)
            await r.table('profiles').get(message.author.id).update({activate: false}).run(client.con)
            message.channel.send('Wyłączono profil')
            break;
        case 'activate':
            if(!myProfile) await r.table('profiles').insert({id: message.author.id, activate: true}).run(client.con)
            await r.table('profiles').get(message.author.id).update({activate: true}).run(client.con)
            message.channel.send('Włączono profil')
            break;
        case 'view':
            let user = await client.users.fetch(args[1]).catch(err=>{}) || message.mentions.users.first() || message.author
            let profile = await r.table('profiles').get(user.id).run(client.con)

            if(!profile?.activate) return message.channel.send("Profil podanego użytkownika jest wyłączony bądź nie istnieje")
            let profileEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Profil użytkownika ${user.tag}`)
                .setDescription(`${profile.description || "Brak opisu"}`)
            if (profile.name) profileEmbed.addField('Imię', profile.name)
            if (profile.email) profileEmbed.addField('Email', profile.email)
            if (profile.birthday) profileEmbed.addField('Data urodzenia', profile.birthday)
            if (profile.discord) profileEmbed.addField('Serwer discord', profile.discord)
            if (profile.facebook) profileEmbed.addField('Facebook', profile.facebook)
            if (profile.youtube) profileEmbed.addField('Youtube', profile.youtube)
            if (profile.twitter) profileEmbed.addField('Twitter', profile.twitter)
            if (profile.twitch) profileEmbed.addField('Twitch', profile.twitch)
            if (profile.reddit) profileEmbed.addField('Reddit', profile.reddit)
            message.channel.send(profileEmbed)
            break;
        case 'variables':
            const variables = new Discord.MessageEmbed()
                .setTitle("Zmienne do profili")
                .addField("\`description\`", "Opis profilu")
                .addField("\`name\`", "Twoje imię")
                .addField("\`email\`", "Adres email")
                .addField("\`birthday\`", "Data urodzenia")
                .addField("\`discord\`", "Twój serwer discord")
                .addField("\`facebook\`", "Twój profil facebook")
                .addField("\`youtube\`", "Twój kanał na youtubie")
                .addField("\`twitter\`", "Twój profil twitter")
                .addField("\`twitch\`", "Twój kanał twitch")
                .addField("\`reddit\`", "Twój profil reddit")
                .setColor("GREEN")
            message.channel.send(variables)
            break;
        case 'set':
            if(!myProfile?.activate) return client.sender(message, "Błąd!", "Profil podanego użytkownika jest wyłączony!", "", "RED", "", "")
            if(!args[2]) return client.sender(message, "Błąd!", "Brak argumentów!", "", "RED", "", "")
            switch(args[1]) {
                case 'name':
                    await r.table('profiles').get(message.author.id).update({name: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Nazwa profilu"},{name: "Nowa wartość", value: args[2]}])

                    break;
                    case 'description':
                        message.channel.send("Nie działa.")
                        break;
                case 'email':
                    await r.table('profiles').get(message.author.id).update({email: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Adres e-mail"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'birthday':
                    await r.table('profiles').get(message.author.id).update({birthday: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Urodziny"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'discord':
                    await r.table('profiles').get(message.author.id).update({discord: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Discord"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'facebook':
                    await r.table('profiles').get(message.author.id).update({facebook: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Facebook"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'youtube':
                    await r.table('profiles').get(message.author.id).update({youtube: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "YouTube"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'twitter':
                    await r.table('profiles').get(message.author.id).update({twitter: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Twitter"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'twitch':
                    await r.table('profiles').get(message.author.id).update({twitch: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "twitch"},{name: "Nowa wartość", value: args[2]}])

                    break;
                case 'reddit':
                    await r.table('profiles').get(message.author.id).update({reddit: args[2]}).run(client.con)

                    client.sender(message, "Ustawiono zmienną", "", "", "GREEN", [{name: "Zmienna", value: "Reddit"},{name: "Nowa wartość", value: args[2]}])
                    break;
                default:
                    client.sender(message, "Błąd!", "Nie znaleziono wartości!", "", "RED", "", "")
                    break;
            }
            break;
        default:

            client.sender(message, "Profile - pomoc", "", "", "GREEN", [
                {
                    name: "\`profile view [użytkownik]\`", value: "Zobacz kogoś profil"
                },
                {
                    name: "\`profile deactivate\`", value: "Wyłącz profil"
                },
                {
                    name: "\`profile activate\`", value: "Włącz swój profil"
                },
                {
                    name: "\`profile set [klucz] [wartość]\`", value: "Skonfiguruj swój profil"
                },
                {
                    name: "\`profile variables\`", value: "Zmienne profili"
                }
            ])
            break;
    }
}
exports.help = {
    name: "profile",
    description: "Ustaw swój profil",
    category: "tools",
}