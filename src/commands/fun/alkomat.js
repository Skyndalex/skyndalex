exports.run = async (client, message, args) => {
    let v = Math.floor(Math.random() * (10 - 0))

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano argumentów!", "", "RED", "", "")
    
    client.sender(message, "Wynik", `Argument ${args.join(" ")} posiada ${v}% promili!`, "", "GREEN", "", "")
}
exports.help = {
    name: "alkomat",
    description: "Sprawdź, ile masz promili",
    category: "fun"
}