const Discord = require("discord.js")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    switch (args[0]) {
        case 'guildMemberAdd':
            client.emit("guildMemberAdd", message.member);

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildMemberAdd\`", "", "GREEN", "", "")

            client.authorSender(message, "Wykryto atywność!!", "Dane akcji poniżej", "", "GREEN", [
                {
                    name: "Serwer",
                    value: message.guild.name
                },
                {
                    name: "Użytkownik",
                    value: message.author.tag
                },
                {
                    name: "Nazwa akcji",
                    value: "\`emit (event:guildMemberAdd)\`"
                }
            ])
            break;
        case 'guildCreate':
            let dev = ["817883855310684180"]
            if (!dev.includes(message.author.id)) return client.error(message, "Wymagane posiadanie permisji developera!!")

            client.emit('guildMemberAdd', message.member)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildCreate\`", "", "GREEN", "", "")

            client.authorSender(message, "Wykryto atywność!!", "Dane akcji poniżej", "", "GREEN", [
                {
                    name: "Serwer",
                    value: message.guild.name
                },
                {
                    name: "Użytkownik",
                    value: message.author.tag
                },
                {
                    name: "Nazwa akcji",
                    value: "\`emit (event:guildCreate)\`"
                }
            ])
            break;
        case 'guildMemberRemove':
            client.emit('guildMemberRemove', message.member)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildMemberRemove\`", "", "GREEN", "", "")

            client.authorSender(message, "Wykryto atywność!!", "Dane akcji poniżej", "", "GREEN", [
                {
                    name: "Serwer",
                    value: message.guild.name
                },
                {
                    name: "Użytkownik",
                    value: message.author.tag
                },
                {
                    name: "Nazwa akcji",
                    value: "\`emit (event:guildMemberRemove)\`"
                }
            ])
            break;
        default:
            client.sender(message, "Co chcesz emitować?", "", "", "GREEN", [{name: "> \`guildMemberAdd\`", value: "Pozwala na uruchomienie eventu \`guildMemberAdd\`"}, {name: "> \`guildCreate\`", value: "Pozwala na uruchomienie eventu \`guildCreate\`"}, {name: "> \`guildMemberRemove\`", value: "Pozwaala na emitowanie eventu \`guildRemoe\`"}])
    }
}
exports.help = {
    name: "emit",
    description: "Emituje event",
    category: "tools",
}