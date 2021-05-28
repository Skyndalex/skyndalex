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
        case 'server-mods':
            client.sender(message, "Lista permisji -> server-mods", "Menu: \`server\`", "UWAGA: Permisje są w wczesnej wersji!", "GREEN", [
                {
                    name: "Lista",
                    value: client.serverModerationPermissionsArray
                }
            ])
            break;
        case 'server-fun':
            client.sender(message, "Lista permisji -> server-fun", "Menu: \`server\`", "UWAGA! Permisje są w wczesnej wersji!", "GREEN", [
                {
                    name: "Lista",
                    value: client.serverFunPermissionsArray
                }
            ])
            break;
        case 'server-tools':
            client.sender(message, "Lista permisji -> server.tools", "Menu: \`server\`", "UWAGA! Permisje są w wczesnej wersji", "GREEN", [
                {
                    name: "Lista",
                    value: client.serverToolsPermissionsArray
                }
            ])
            break;
        case 'global-economy':
            client.sender(message, "Lista permisji -> global.economy", "Menu: \`global\`", "UWAGA! Permisje są w wczesnej wersji", "GREEN", [
                {
                    name: "Lista",
                    value: client.serverEconomyPermissionsArray
                }
            ])
            break;
        case 'server-vc':
            client.sender(message, "Lista permisji -> server.vc", "Menu: \`server\`", "UWAGA! Permisje są w wczesnej wersji", "GREEN", [
                {
                    name: "Lista",
                    value: client.serverVCmanagementPermissionsArray
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
                    name: "\`permissions server-mods\`",
                    value: "Lista permisji moderatorskich"
                },
                {
                    name: "\`permissions server-fun\`",
                    value: "Lista permisji do komend 4Fun"
                },
                {
                    name: "\`permissions server-tools",
                    value: "Lista permisji do komend Tools"
                },
                {
                    name: "\`permissions global-economy\`",
                    value: "Lista permisji do globalnej ekonomii"
                },
                {
                    name: "\`permissions server-vc\`",
                    value: "Lista permisji do komend Zarządzania kanałami VC"
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