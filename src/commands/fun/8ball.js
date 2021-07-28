exports.run = async (client, message, args) => {
   // if (args[0] === "Gdzie korrumz") return client.sender(message, "Zadałeś mi pytanie!", "", "","GREEN", [{name: "Pytanie", value: "Gdzie korrumz"}, {name: "Odpowiedź", value: "Trzymam go w piwnicy, ale spokojnie regularnie dostaje jedzenie."}])

    if (!args[0]) return client.sender(message, "Błąd!", "Nie podano argumentów!", "", "RED", "", "")

    let responses = ["Tak", "Nie", "Na pewno nie", "Na pewno tak", "100%" ,"1%"]

    client.sender(message, "Zadałeś mi pytanie!", "", "", "GREEN", [{name: "Pytanie", value: args.join(" ")}, {name: "Odpowiedź", value: responses.random()}])
}
exports.help = {
    name: "8ball",
    description: "Zadaj pytanie botowi, a on ci na nie odpowie",
    category: "fun"
}