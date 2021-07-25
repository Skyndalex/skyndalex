const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const guild = await r.table("autorole").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Auto-Role", "Witaj w menu autoroli! Możesz tutaj dodać role które użytkownik będzie dostawał automatycznie.", "UWAGA! - Nie da się dodać kolejnej roli.", "GREEN", [
                {
                    name: "> Lista", value: `<@&${guild.role}>`
                },
                {
                    name: "> Dodawanie roli", value: "autorole \`add [oznaczenie]\`"
                },
                {
                    name: "Włączanie/Wyłączanie", value: "autorole \`activate/deactivate\`"
                }
            ])
            break;
               case 'add':
                if (!guild?.activate) return message.channel.send("Autorole są wyłączone!")

                const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
                if (!role) return message.channel.send("Nie podano roli.")

                const updated = await r.table("autorole").get(message.guild.id).update({role: role.id}).run(client.con)
                if (!updated) return message.channel.send("Nie aktywowano autoroli!")

                message.channel.send("Zaktualizowano role!")
                break;
                case 'activate':
                    if (!guild) await r.table("autorole").insert({id: message.guild.id,activate: true}).run(client.con)
                    
                    r.table("autorole").update({activate: true}).run(client.con)
                    
                    client.sender(message, "Aktualizacja ustawień", "Włączono autorole!", "", "GREEN", "", "")
                    break;
                case 'deactivate':
                    await r.table("autorole").get(message.guild.id).update({activate: false}).run(client.con)
                    
                    client.sender(message, "Aktualizacja ustawień", "Wyłączono autorole!", "", "RED", "", "")
                    break;
    }
};

exports.help = {
    name: "autorole",
    description: "Dodaj autorolę.",
    category: "tools",
    aliases: ["ar"]
}