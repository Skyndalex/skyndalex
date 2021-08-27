exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "Błąd!", "Nie podałeś argumentów.", "", "RED")

    let reponses = [
        "Tak",
        "Nie",
        "Chyba tak",
        "Chyba nie"
    ]
        client.sender(message, "", "", "", "GREEN", [
            {
                name: "Twoje pytanie",
                value: args.slice(" ").join(" "),
            },
            {
                name: "Odpowiedź",
                value: reponses.random(),
            }
        ])
};

exports.help = {
    name: "8ball",
    description: "Magiczna kula!",
    perms: "server.send_messages.8ball",
    category: "fun"
}