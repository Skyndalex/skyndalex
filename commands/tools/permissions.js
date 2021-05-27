exports.run = async (client, message, args) => {
    switch (args[0]) {
        case 'global':
            client.sender(message, "Lista permisji -> global", "Menu: \`global\`", "UWAGA: Permisje są w wczesnej wersji!", "GREEN", [
                {
                    name: "Globalne",
                    value: client.globalPermissionsArray
                }
            ])
            break;
        default:
            client.sender(message, "Pomoc do permisji użytkowników", "", "", "GREEN", [
                {
                    name: "\`permissions add [użytkownik] [permisja]\`",
                    value: "Nadaj permisje użytkownikowi"
                },
                {
                    name: "\`permissions remove [użytkownik] [permisja]\`",
                    value: "Zabierz permisje użytkownikowi"
                },
                {
                    name: "\`permissions list\`",
                    value: "Lista permisji"
                },
                {
                    name: "\`permissions global\`",
                    value: "Lista globalnych permisji"
                },
                {
                    name: "\`permisions check [permisja]\`",
                    value: "Sprawdzanie permisji"
                },

            ])
    }
}
exports.help = {
    name: "permissions",
    description: "System permisji",
    category: "tools",
}