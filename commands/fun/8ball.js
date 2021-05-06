const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

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
    category: "fun"
}