const r = require("rethinkdb")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    //TYMCZASOWO: przepisane z starej wersji 3.0 Skyndalexa (2020)

    const role = await r.table("settings").get(message.guild.id)("userRole").default(null).run(client.con)

    if (message.member.roles.cache.map(r=>r.id).includes(role)) return client.sender(message, "405: Method not allowed", "Jesteś już zweryfikowany! Nie możesz zweryfikować się po raz drugi.", client.footer, "RED", "", "")

    const characters = "abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789!@#$%^&*()";

    let out = "";
    for (let i=0; i < 5; i++) {
        out += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    const response = await client.awaitReply(message, `Przepisz ten kod aby zostać zweryfikowanym: \`${out}\``);

    if (response.content!=out) return message.channel.send('Niepoprawny kod!')

    message.member.roles.add(role).catch(err=>message.channel.send(`Nastąpił problem! Błąd to: ${err}`))

    client.sender(message, "Powodzenie", `Zweryfikowano pomyślnie użytkownika ${message.author.tag}!`, "Krive verification v1.0", "GREEN", "", "")
    client.sender(message, "UWAGA!", "System weryfikacji jest w bardzo wczesnej wersji. Kod został przepisany z starego bota (wersja z 2020 roku) i bardzo łatwo go ominąć z selfbotem. Są to tylko testy beta. Prosimy nie korzystać z niej w 100% na serwerze!", "Ta wiadomość zniknie za minutę", "RED", "", "").then(h => {
        h.delete({timeout: 60000})
    })

    const logChannel = await r.table("logs").get(message.guild.id)("verificationLog").default(null).run(client.con)

    const embedVerificationLog = new Discord.MessageEmbed()
    .setTitle("Logi: Zweryfikowano użytkownika")
    .addField("Użytkownik", message.author.tag)
    .addField("ID serwera", message.guild.id)
    .setTimestamp()
    .setColor("GREEN")
 client.channels.cache.get(logChannel).send(embedVerificationLog)
}
exports.help = {
    name: "verify",
    category: "tools",
    description: "Dzięki tej komendzie możesz zweryfikować się na serweerze, jeżeli administrator włączył weryfikację.",
};