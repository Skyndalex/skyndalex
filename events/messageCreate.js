const r = require("rethinkdb")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
    name: "messageCreate",
    once: false,

    async execute(client, message) {
        const { prefix } = require("../config.json")

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const WelcomeMessagesArray = ["Witaj", "Miło mi cię poznać!", "Dzień dobry!"]
        const CommandsMessagesArray = ["ping", "help", "ban", "kick", "set", "logs"]

        const mention = new MessageEmbed()
            .setTitle(WelcomeMessagesArray.random())
            .setDescription(`\`\`\`Ping: ${client.ws.ping}\nLiczba serwerów: ${client.guilds.cache.size}\nLiczba użytkowników: ${client.users.cache.size}\nWersja bota: ${client.version}\`\`\`\nPolecamy dokumentację aby zapoznać się z brakiem komend, niektórych configów itd: https://docs.krivebot.xyz`)
            .setFooter(`Polecane komendy: ${CommandsMessagesArray.random()}`)
            .setColor("ORANGE")
            .setTimestamp()
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.channel.send({ embeds: [mention] }).then(m => {
                setTimeout(() => m.delete(), 10000);
            })
        }

        try {
            const imgChannel = await r.table("settings").get(message.guild.id)("imageChannel").run(client.con)

            if (message.channel.id === imgChannel) {
                if (message.attachments.size === 0) {
                    message.delete()
                }
            }
        } catch {false}
            if (message.author.bot) return;

            if (message.channel.type === "DM") {
                if (message.content === "support") {
                    message.reply({ content: "Wpisz wiadomość, aby skontaktować się z supportem" })
                } else {
                    const embedSupport = new MessageEmbed()
                        .setTitle("Na pewno?")
                        .setDescription(`Wysyłasz wiadomość o treści: ${message.content}\nAkceptując zgadzasz się na udostępnienie administracji bota twojego ID oraz nazwy użytkownika`)
                        .setColor("YELLOW")

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('primary')
                                .setLabel('Potwierdzam')
                                .setStyle('SUCCESS'),
                        );

                    const row2 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('Więcej informacji')
                                .setURL("https://docs.krivebot.xyz")
                                .setStyle("LINK")
                        );
                    message.reply({ embeds: [embedSupport], components: [row, row2] })

                    const filter = i => i.customId === 'primary' && i.user.id === message.author.id;

                    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

                    collector.on('collect', async i => {
                        if (i.customId === 'primary') {
                            if (!message.guild) client.channels.cache.get("861351339446632508").send({ content: `\`DMSUPPORT\`: ${message.author.tag} (${message.author.id}): ${message.content}` })

                            i.reply("Wysłano wiadomość do supportu")
                        }
                    });
                }
            }
            if (!message.content.startsWith(prefix)) return

            const gban = await r.table("gbans").get(message.author.id).run(client.con)
            if (gban) return client.sender(message, "Otrzymałeś blokadę!", "Nie możesz korzystać z komend!", "", "RED", "", "", "")

            const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);

            if (cmd) cmd.run(client, message, args)

    }
}