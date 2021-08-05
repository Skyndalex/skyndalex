exports.run = async (client, message, args) => {   
    let percent = Math.floor(Math.random() * (100 - 0))

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano **1** argumentu!", client.footer, "RED", "", "")
    if (!args[1]) return client.sender(message, "Błąd!", "Nie podano **2** argumentu!", client.footer, "RED", "", "")

    client.sender(message, "", `${args[0]} oraz ${args[1]} kochają się na ${percent}%!`, "", "GREEN", "", "")
}
exports.help = {
    name: "ship",
    description: "Zakochaj sobie użytkowników :D.",
    category: "fun"
}