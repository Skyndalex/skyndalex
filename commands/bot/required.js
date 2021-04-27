const Discord = require("discord.js")

exports.run = async (client, message, args) => {
/*
    const reactionsPreparing = new Discord.MessageEmbed()
        .setDescription("Oczekiwanie na reakcje...")
        .setColor("GREEN")

    const reactionOptions = new Discord.MessageEmbed()
        .setTitle("Dostępne opcje.")
        .addField("🤖", "Menu zabezpieczeń - bot")
        .addField('📋', "Menu zabezpieczeń - serwer")
        .setColor("GREEN")

    const serverOptions = new Discord.MessageEmbed()
        .setTitle("Zabezpieczenia - serwer")
        .addField("Zalecane [1]", "Ustaw w menu moderacji serwera opcję weryfikacji użytkowników na telefon.")
        .addField("Zalecane [2]", "Ustaw w menu moderacji wymagane 2fa dla twoich moderatorów serwera. ")
        .setColor("GREEN")

    const botOptions = new Discord.MessageEmbed()
        .setTitle("Zabezpieczenia - bot")
        .addField("Zalecane [1]", "Zabierz botu poufne permisje \`(ADMINISTRATOR, MENTION_EVERYONE, BAN_MEMBERS, KICK_MEMBER\` itp. Dbamy o wasze bezpieczeństwo serwerów i rajdy nigdy nie są przeprowadzane przez właściciela (aczkolwiek, raczej rajdu NIE BĘDZIE.)")
        .addField("Zalecane [2]", "Przeczytaj nasz wpis o zabezpieczeniach")
        .setColor("GREEN")

    message.channel.send(reactionsPreparing).then(m => {
        m.react("🤖")
        m.react("📋")
    }).then(() => m.edit(reactionOptions))

    const filter = (reaction, user) => {
        return ["🤖", "📋"].includes(reaction.emoji.name) && user.id === message.author.id;
    }
    const collector = m.createReactionCollector(filter, {time: 60000 })

    collector.on("end", () => {
        m.reactions.removeAll()
    })

    collector.on("collect", reaction => {
        if (reaction.emoji.name === "🤖") {
            m.edit(botOptions)
        } else if (reaction.emoji.name === "📋") {
            m.edit(serverOptions)
        }
        reaction.users.remove(message.author.id)
    })

 */
    client.commandNotEnabled(message, "Przeniesione do wersji 3.1")
}
exports.help = {
    name: "required",
    description: "Zalecane akcje.",
    category: "bot",
}