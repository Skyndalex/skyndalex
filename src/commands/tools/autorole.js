const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        default:
            const roleList = await r.table("autorole").get(message.guild.id)("role").run(client.con)

            client.sender(message, "Auto-Role", "Witaj w menu autoroli! Możesz tutaj dodać role które użytkownik będzie dostawał automatycznie.", "UWAGA! - Nie da się dodać kolejnej roli.", "GREEN", [
                {
                    name: "> Lista",
                    value: `<@&${roleList}>`
                },
                {
                    name: "> Dodawanie roli",
                    value: "autorole add [oznaczenie]"
                },
            ])
            break;
            case 'add':
                const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()

                const updated = await r.table("autorole").update({role: role.id}).run(client.con)

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