const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    /*
    https://api.github.com/users/Korrumz2PL
        data:
      - avatar_url
      - url
      - html_url
      - followers_url
      - starred_url
      - subscriptions_url
      - organizations_url
      - repos_url
      - events_url
      - received_events_url
      -
     */

    const user = args[0]
    if (!user) return message.channel.send("Brak użytkownika")

    fetch(`https://api.github.com/users/${user}`)
        .then(res => res.json())
        .then(json => {
            client.sender(message, `Informacje o koncie github: ${json.name}`, ``, ``, `GREEN`, [
                {
                    name: "Nazwa użytkownika",
                    value: json.name
                },
                {
                    name: "Link do profilu",
                    value: json.html_url
                },
                {
                    name: "Link do obserwujących użytkownika",
                    value: json.followers_url
                },
                {
                    name: "Link do użytkowników obserwowanych przez użytkownika",
                    value: json.followind_url
                },
                {
                    name: "Typ użytkownika",
                    value: json.type
                },
                {
                    name: "Firma",
                    value: json.company||"Brak"
                },
                {
                    name: "Blog",
                    value: json.blog||"Brak"
                },
                {
                    name: "Państwo",
                    value: json.location
                },
                {
                    name: "Adres e-mail (Podany w serwisie GitHub)",
                    value: json.email
                },
                {
                    name: "Bio",
                    value: json.bio
                },
                {
                    name: "Liczba publicznych repozytorium",
                    value: json.public_repos
                },
                {
                    name: "Liczba publicznych gistów",
                    value: json.public_gists
                },
                {
                    name: "Obserwujący",
                    value: json.followers
                },
                {
                    name: "Obserwuje",
                    value: json.following
                },
                {
                    name: "Ostatnia aktualizacja konta",
                    value: json.updated_at
                },
                {
                    name: "Konto stworzono o",
                    value: json.created_at
                }
            ])
        })
}
exports.help = {
    name: "github",
    description: "Wyswietla statystyki użytkownika na platformie GitHub",
    category: "fun",
}