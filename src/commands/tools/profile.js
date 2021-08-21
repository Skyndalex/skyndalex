const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    /* DO PRZEPISANIA:
    - EMBEDY 
    - IFY
    */
    const myProfile = await r.table('profiles').get(message.author.id).run(client.con)
    switch (args[0]) {
        case 'deactivate':
            if (!myProfile) await r.table('profiles').insert({ userid: message.author.id, activate: false }).run(client.con)
            await r.table('profiles').get(message.author.id).update({ activate: false }).run(client.con)

            client.sender(message, "", "Wyłączono profil", "", "YELLOW", "", "", "")
            break;
        case 'activate':
            if (!myProfile) await r.table('profiles').insert({ userid: message.author.id, activate: true }).run(client.con)
            await r.table('profiles').get(message.author.id).update({ activate: true }).run(client.con)

            client.sender(message, "", "Włączono profil", "", "GREEN", "", "", "")
            break;
        case 'view':
            let user = await client.users.fetch(args[1]).catch(err => { }) || message.mentions.users.first() || message.author
            let profile = await r.table('profiles').get(user.id).run(client.con)
            if (!profile?.activate) return client.sender(message, "Błąd", "Profil podanego użytkownika jest wyłączony", "", "RED", "", "", "")
            let profileEmbed = new MessageEmbed()
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
            message.channel.send({ embeds: [profileEmbed] })
            break;
        case 'variables':
            const variables = new MessageEmbed()
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
                .setURL("https://docs.krivebot.xyz/profiles/")
            message.channel.send({ embeds: [variables] })
            break;
        case 'set':
            if (!myProfile?.activate) return client.sender(message, "Błąd", "Profil podanego użytkownika jest wyłączony", "", "RED", "", "", "")
            if (!args[2]) return client.error(message, 'Nie podałeś co mam ustawić lub na co mam to ustawić.')
            switch (args[1]) {
                case 'name':
                    await r.table('profiles').get(message.author.id).update({ name: args[2] }).run(client.con)

                    const embedProfileConfigName = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "name")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigName] })
                    break;
                case 'email':
                    await r.table('profiles').get(message.author.id).update({ email: args[2] }).run(client.con)

                    const embedProfileConfigEmail = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "email")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigEmail] })
                    break;
                case 'birthday':
                    await r.table('profiles').get(message.author.id).update({ birthday: args[2] }).run(client.con)

                    const embedProfileConfigBirthday = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "Birthday")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigBirthday] })
                    break;
                case 'discord':
                    await r.table('profiles').get(message.author.id).update({ discord: args[2] }).run(client.con)

                    const embedProfileConfigDiscord = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField('Zmienna', "Discord")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigDiscord] })
                    break;
                case 'facebook':
                    await r.table('profiles').get(message.author.id).update({ facebook: args[2] }).run(client.con)

                    const embedProfileConfigFacebook = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "Facebook")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigFacebook] })
                    break;
                case 'youtube':
                    await r.table('profiles').get(message.author.id).update({ youtube: args[2] }).run(client.con)

                    const embedProfileConfigYoutube = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "YouTube")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigYoutube] })
                    break;
                case 'twitter':
                    await r.table('profiles').get(message.author.id).update({ twitter: args[2] }).run(client.con)

                    const embedProfileConfigTwitter = new MessageEmbed()
                        .setTitle("Ustawiono zmienna")
                        .addField("Zmienna", "Twitter")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")

                    message.channel.send({ embeds: [embedProfileConfigTwitter] })
                    break;
                case 'twitch':
                    await r.table('profiles').get(message.author.id).update({ twitch: args[2] }).run(client.con)

                    const embedProfieConfigTwitch = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "twitch")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfieConfigTwitch] })
                    break;
                case 'reddit':
                    await r.table('profiles').get(message.author.id).update({ reddit: args[2] }).run(client.con)

                    const embedProfileConfigReddit = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "reddit")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigReddit] })
                    break;
                case 'description':
                    await r.table('profiles').get(message.author.id).update({ description: args.slice(2).join(" ") }).run(client.con)

                    const embedProfileConfigDescription = new MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "description")
                        .addField("Nowa wartość", args.join(" ").slice(args[2]))
                        .setColor("GREEN")
                    message.channel.send({ embeds: [embedProfileConfigDescription] })
                    break;
                default:
                    client.sender(message, "Błąd!", "Nie znaleziono wartości", "", "RED", "", "", "")
                    break;
            }
            break;
        default:
            client.sender(message, "Profile - Pomoc", "", "DOKUMENTACJA: https://docs.krivebot.xyz/profiles", "GREEN", [
                {
                    name: "\`profile view [tag]\`", value: "Zobacz kogoś profil"
                },
                {
                    name: "\`profile deactivate\`", value: "Wyłącz profil"
                },
                {
                    name: "\`profile activate\`", value: "Włącz profil"
                },
                {
                    name: "\`profile set [klucz] [wartość]\`", value: "Ustaw profil"
                },
                {
                    name: "\`profile variables\`", value: "Zmienne do ustawień profilu"
                }
            ])
            break;
    }
}
exports.help = {
    name: "profile",
    description: "Profile",
    category: "tools",
}