const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    //TODO: usuwanie zmiennych z profili
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
            if(!profile?.activate) return client.error(message, 'Profil podanego użytkownika jest wyłączony')
            let profileEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Profil użytkownika ${user.tag}`)
                .setDescription(`${profile.description || "Brak opisu"}`)
            if(profile.name) profileEmbed.addField('Imię', profile.name)
            if(profile.email) profileEmbed.addField('Email', profile.email)
            if(profile.birthday) profileEmbed.addField('Data urodzenia', profile.birthday)
            if(profile.discord) profileEmbed.addField('Serwer discord', profile.discord)
            if(profile.facebook) profileEmbed.addField('Facebook', profile.facebook)
            if(profile.youtube) profileEmbed.addField('Youtube', profile.youtube)
            if(profile.twitter) profileEmbed.addField('Twitter', profile.twitter)
            if(profile.twitch) profileEmbed.addField('Twitch', profile.twitch)
            if(profile.reddit) profileEmbed.addField('Reddit', profile.reddit)
            if (profile.badge) profileEmbed.addField('Odznaki', profile.badge)
            profileEmbed.setFooter(client.footer)
            message.channel.send(profileEmbed)
            break;
        case 'variables':
            const variables = new Discord.MessageEmbed()
                .setTitle("Zmienne do profili")
                .addField("\`description\`", "Opis profilu")
                .addField("\`name\`", "Twoje imię")
                .addField("\`email\`", "Adres email")
                .addField("\`birtday\`", "Data urodzenia")
                .addField("\`discord\`", "Twój serwer discord")
                .addField("\`facebook\`", "Twój profil facebook")
                .addField("\`youtube\`", "Twój kanał na youtubie")
                .addField("\`twitter\`", "Twój profil twitter")
                .addField("\`twich\`", "Twój kanał twitch")
                .addField("\`reddit\`", "Twój profil reddit")
                .setColor("GREEN")
            message.channel.send(variables)
            break;
        case 'set':
            if(!myProfile?.activate) return client.error(message, 'Profil podanego użytkownika jest wyłączony')
            if(!args[2]) return client.error(message, 'Nie podałeś co mam ustawić lub na co mam to ustawić.')
            switch(args[1]) {
                case 'name':
                    await r.table('profiles').get(message.author.id).update({name: args[2]}).run(client.con)

                    const embedProfileConfigName = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "Name")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigName)
                    break;
                case 'email':
                    await r.table('profiles').get(message.author.id).update({email: args[2]}).run(client.con)

                    const embedProfileConfigEmail = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "email")
                        .addField("Nowa wartość", args[2])
                    message.channel.send(embedProfileConfigEmail)
                    break;
                case 'birthday':
                    await r.table('profiles').get(message.author.id).update({birthday: args[2]}).run(client.con)

                    const embedProfileConfigBirthday = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "Birthday")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigBirthday)
                    break;
                case 'discord':
                    await r.table('profiles').get(message.author.id).update({discord: args[2]}).run(client.con)

                    const embedProfileConfigDiscord = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField('Zmienna', "Discord")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigDiscord)
                    break;
                case 'facebook':
                    await r.table('profiles').get(message.author.id).update({facebook: args[2]}).run(client.con)

                    const embedProfileConfigFacebook = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "Facebook")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigFacebook)
                    break;
                case 'youtube':
                    await r.table('profiles').get(message.author.id).update({youtube: args[2]}).run(client.con)

                    const embedProfileConfigYoutube = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "YouTube")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigYoutube)
                    break;
                case 'twitter':
                    await r.table('profiles').get(message.author.id).update({twitter: args[2]}).run(client.con)

                    const embedProfileConfigTwitter = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienna")
                        .addField("Zmienna", "Twitter")
                        .addField("Nowa wartość", args[2])
                    message.channel.send(embedProfileConfigTwitter)
                    break;
                case 'twitch':
                    await r.table('profiles').get(message.author.id).update({twitch: args[2]}).run(client.con)

                    const embedProfieConfigTwitch = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "twitch")
                        .addField("Nowa wartość", args[2])
                    message.channel.send(embedProfieConfigTwitch)
                    break;
                case 'reddit':
                    await r.table('profiles').get(message.author.id).update({reddit: args[2]}).run(client.con)

                    const embedProfileConfigReddit = new Discord.MessageEmbed()
                        .setTitle("Ustawiono zmienną")
                        .addField("Zmienna", "reddit")
                        .addField("Nowa wartość", args[2])
                        .setColor("GREEN")
                    message.channel.send(embedProfileConfigReddit)
                    break;
                default:
                    client.error(message, "Nie znaleziono wartości.")
                    break;
            }
            break;
        default:
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Profile - pomoc')
                .addField("\`profile view [użytkownik]\`", "Zobacz kogoś profil")
                .addField("\`profile deactivate\`", "Wyłącz profil")
                .addField("\`profile activate\`", "Włącz profil")
                .addField("\`profile set [klucz] [wartość]\`", "Skonfiguruj swój profil")
                .addField("\`profile variables\`", "Zmienne które można użyć w profilu")
                .setFooter(client.footer)
            message.channel.send(embed)
            break;
    }
}
exports.help = {
    name: "profile",
    description: "Profile",
    category: "tools",
}