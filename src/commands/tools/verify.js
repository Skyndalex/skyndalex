const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const role = await r.table("settings").get(message.guild.id)("verifyRole").run(client.con)
    if (!role) return message.channel.send("Nie znaleziono roli")

    if (message.member.roles.cache.map(r=>r.id).includes(role)) return client.sender(message, "Błąd!", "Jesteś już zweryfikowany! Nie możesz zweryfikować się po raz drugi.", "", "RED", "", "")

    const characters = "abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789!@#$%^&*()";

    let out = "";
    for (let i=0; i < 5; i++) {
        out += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    const response = await client.awaitReply(message, `Przepisz ten kod aby zostać zweryfikowanym: \`${out}\``);

    if (response.content!=out) return message.channel.send('Niepoprawny kod!')

    message.member.roles.add(role).catch(err=>message.channel.send(`Nastąpił problem! Błąd to: ${err}`))

    client.sender(message, "", `Dodano rolę dla ${message.author.tag}`, "", "GREEN", "", "", "")
}
exports.help = {
    name: "verify",
    description: "Zweryfikuj się",
    usage: "verify",
    perms: "server.send_messages.verify",
    category: "tools"
}