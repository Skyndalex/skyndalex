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
            profileEmbed.setFooter(client.footer)
            message.channel.send(profileEmbed)
        break;
        case 'set':
            if(!myProfile?.activate) return client.error(message, 'Profil podanego użytkownika jest wyłączony')
            if(!args[2]) return client.error(message, 'Nie podałeś co mam ustawić lub na co mam to ustawić.')
            switch(args[1]) {
                case 'name':
                    await r.table('profiles').get(message.author.id).update({name: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'email':
                    await r.table('profiles').get(message.author.id).update({email: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'birthday':
                    await r.table('profiles').get(message.author.id).update({birthday: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'discord':
                    await r.table('profiles').get(message.author.id).update({discord: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'facebook':
                    await r.table('profiles').get(message.author.id).update({facebook: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'youtube':
                    await r.table('profiles').get(message.author.id).update({youtube: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'twitter':
                    await r.table('profiles').get(message.author.id).update({twitter: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'twitch':
                    await r.table('profiles').get(message.author.id).update({twitch: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                case 'reddit':
                    await r.table('profiles').get(message.author.id).update({reddit: args[2]}).run(client.con)
                    message.channel.send('Ustawiono.')
                break;
                default:
                    message.channel.send('jak ty to kurwa wypierdoliłeś')
                break;
            }
        break;
        default:
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Profile - pomoc')
            .setDescription(`profile view (@użytkownik) - sprawdź czyiś profil\nprofile deactivate/activate - wyłącz/włącz swój profil\nprofile set (klucz) (wartość) - edytuj swój profil`)
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