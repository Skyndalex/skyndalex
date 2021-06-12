const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    /*
    https://api.ashcon.app/mojang/v2/user/Korrumz2
        data:
      - username
      - uuid
      - username_history
      - textures: [custom, slim]
      - skin: [url, data]
      - created_at
     */

    fetch(`https://api.ashcon.app/mojang/v2/user/${args[0]}`)
        .then(res => res.json())
        .then(json => {

            let data = [];
            for (let i in json.username_history) {
                data.push(json.username_history[i].username);
            }
            if (!data) return message.channel.send("Nie znaleziono użytkownika")
            client.sender(message, `Informacje o koncie minecraft: ${json.username}`, ``, ``, `GREEN`, [
                {
                    name: "Konto stworzono o:",
                    value: json.created_at||"Nie znaleziono danych: \`created_at\`"
                },
                {
                    name: "Nazwa użytkownika",
                    value: json.username||"Nie znaleziono danych: \`username\`"
                },
                {
                    name: "UUID",
                    value: json.uuid||"Nie znaleziono danych: \`uuid\`"
                },
                {
                    name: "Historia nicków (najstarszy --> najnowszy)",
                    value: `\`\`\`${data.join(" , ")}\`\`\``||"Nie znaleziono danych: \`username_history\`"
                }
            ])
        })
}
exports.help = {
    name: "mc",
    description: "Wyswietla statystyki gracza w minecrafcie",
    category: "fun",
}