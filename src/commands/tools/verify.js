exports.run = async (client, message, args) => {
    if (message.guild.id !== '804477558061137972') return message.channel.send("Ta komenda jest niepubliczna! Można jej użyć tylko i wyłącznie na serwerze support!")

    const verified = message.guild.roles.cache.get("841343396269785118")
    if (message.member.roles.cache.map(r=>r.id).includes(verified)) return client.sender(message, "Błąd!", "Jesteś już zweryfikowany! Nie możesz zweryfikować się po raz drugi.", "", "RED", "", "")

    
    const characters = "abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789!@#$%^&*()";

    let out = "";
    for (let i=0; i < 5; i++) {
        out += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    const response = await client.awaitReply(message, `Przepisz ten kod aby zostać zweryfikowanym: \`${out}\``);

    if (response.content!=out) return client.sender(message, "Błąd!", "Niepoprawny kod!", "", "RED", [
        {
            name: "Zapamiętaj!",
            value: "Kod nie może się niczym różnić. Uwzględniane są spacje, wielkie litery itp. Zalecamy go skopiować."
        }
    ])

    message.member.roles.add(verified).catch(err=>message.channel.send(`Nastąpił problem! Błąd to: ${err}`))

    client.sender(message, "Już!", `Zweryfikowano pomyślnie użytkownika ${message.author.tag}!`, "Krive verification v1.0", "GREEN", "", "")
}
exports.help = {
    name: "verify",
    description: "Weryfikacja użytkownika na serwerze support",
    category: "tools",
}