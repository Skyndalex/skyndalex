const r = require("rethinkdb");
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.prefix\`", "", "RED", "", "")

    const prefix = args[0]
    if (!prefix) return message.channel.send("Nic nie podałeś!")

    if (args[0] === "client.token") return message.reply("sus")

    await r.table("settings").insert({
        id: message.guild.id,
        prefix: prefix
    }).run(client.con)
    await r.table("settings").update({ prefix: args[0] }).run(client.con)

    client.sender(message, ``, `**Zaktualizowano prefiks**\n\nZmieniony prefiks: ${prefix}`, `Prefiksy`, `GREEN`, ``)
}
exports.help = {
    name: "prefix",
    usage: "prefix [znak]",
    perms: "global.send_messages.prefix",
    category: "tools",
    description: "Zmień prefix na serwerze",
}