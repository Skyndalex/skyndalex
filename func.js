const Discord = require("discord.js")
module.exports = (client) => {
    client.error = async (message, text) => {
        let embedError = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Wystąpił błąd!`)
            .setDescription(text.replace(client.token, '[token]'))
            .setColor('#fc8700')
            .setFooter(`Błąd - KriveBot v3 || https://krivebot.tk/discord`, client.user.displayAvatarURL())
        return message.channel.send(embedError).catch(err => {
            client.guilds.cache.get("707506586184319036").channels.cache.get("723973152660520980").send(`Problem z \`\`\`${err}\`\`\``)
            message.author.send(`Wystąpił błąd podczas wykonywania kodu! Poinformowałem programistów.\nBłąd: \`\`\`${err}\`\`\``)
        })
    }
    client.commandNotEnabled = async (message, text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Komenda wyłączona!")
            .setDescription(`Z powodu: ${text.replace(client.token, '[token]')}`)
            .setColor("RED")
        return message.channel.send(embed)
    }
      Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
}