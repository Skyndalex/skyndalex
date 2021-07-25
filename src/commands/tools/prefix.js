const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano prefixu!", "", "RED", "", "")

    const prefix = await r.table("settings").insert({ id: message.guild.id,prefix: args[0] }).run(client.con)
    const prefix2 = await r.table("settings").get(message.guild.id).update({ prefix: args[0] }).run(client.con)

    client.sender(message, "", `Ustawiono prefix na wartość: \`${args[0]}\``, "", "GREEN", "", "")
};

exports.help = {
    name: "prefix",
    description: "Ustaw prefix bota",
    category: "tools",
    aliases: ["p"]
}