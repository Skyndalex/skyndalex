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
    if (!user) return message.channel.send("Brak użytkownika\nŻĄDANE: \`github_user\`")

    fetch(`https://api.github.com/users/${user}`)
        .then(res => res.json())
        .then(json => {
            client.sender(message, `Informacje o koncie github: ${json.name}`, ``, ``, `GREEN`, [
                {
                    name: "Nazwa użytkownika",
                    value: json.name||"Nie znaleziono informacji"
                },
                {
                    name: "Link do profilu",
                    value: json.html_url||"Nie znaleziono informacji"
                },
                {
                    name: "Link do obserwujących użytkownika",
                    value: json.followers_url||"Nie znaleziono informacji"
                },
                {
                    name: "Link do użytkowników obserwowanych przez użytkownika",
                    value: json.followind_url||"Nie znaleziono informacji"
                },
                {
                    name: "Typ użytkownika",
                    value: json.type||"Nie znaleziono informacji"
                },
                {
                    name: "Firma",
                    value: json.company||"Nie znaleziono informacji"
                },
                {
                    name: "Blog",
                    value: json.blog||"Nie znaleziono informacji"
                },
                {
                    name: "Państwo",
                    value: json.location||"Nie znaleziono informacji"
                },
                {
                    name: "Adres e-mail (Podany w serwisie GitHub)",
                    value: json.email||"Nie znaleziono informacji"
                },
                {
                    name: "Bio",
                    value: json.bio||"Nie znaleziono informacji"
                },
                {
                    name: "Liczba publicznych repozytorium",
                    value: json.public_repos||"Nie znaleziono informacji"
                },
                {
                    name: "Liczba publicznych gistów",
                    value: json.public_gists||"Nie znaleziono informacji"
                },
                {
                    name: "Obserwujący",
                    value: json.followers||"Nie znaleziono informacji"
                },
                {
                    name: "Obserwuje",
                    value: json.following||"Nie znaleziono informacji"
                },
                {
                    name: "Ostatnia aktualizacja konta",
                    value: json.updated_at||"Nie znaleziono informacji"
                },
                {
                    name: "Konto stworzono o",
                    value: json.created_at||"Nie znaleziono informacji"
                }
            ])
        })
}
exports.help = {
    name: "github",
    description: "Wyswietla statystyki użytkownika na platformie GitHub",
    category: "fun",
}