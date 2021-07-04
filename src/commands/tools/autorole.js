const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        default:
            client.sender(message, "Auto-Role", "Witaj w menu autoroli! Możesz tutaj dodać role które użytkownik będzie dostawał automatycznie.", "UWAGA! - Nie da się usuwać autoroli.", "GREEN", [
                {
                    name: "> Lista",
                    value: "BRAK! - Nie dodano żadnych AutoRoli."
                },
                {
                    name: "> Dodawanie roli",
                    value: "autorole add [oznaczenie]"
                },
            ])
            break;
            case 'add':
                const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()

                const updated = await r.table("autorole").update({role: role.id})

                message.channel.send("Zaktualizowano role!")
                break;
    }
};

exports.help = {
    name: "autorole",
    description: "Dodaj autorolę.",
    category: "tools",
    aliases: ["ar"]
}