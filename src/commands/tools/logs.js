exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.logsconfig\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")
    
    client.sender(message, "Niedostępne", "Ze względu na skrajną niestabilność handlerów i ogólnie eventów funkcja w bocie została zablokowana do czasu nowego kodu. Nie stanowiło to niebezpieczeństw dla serwerów (po prostu nie działało). Przepraszamy!", "", "RED", "", "")

};

exports.help = {
    name: "logs",
    description: "Ustawienia logów",
    category: "tools",
    aliases: ["ustaw"]
}