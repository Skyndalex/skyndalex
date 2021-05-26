exports.run = (client, message) => {
    client.sender(message, "Social-media", "Bardzo dużo osób zaczęło się pod nas podszywać i wiele osób dla żartu zaczęło zamiast normalnych kont subskrybować podróby. Dlatego załączamy tutaj listę naszych oficjalnych kont na mediach społecznościowych.", "", "GREEN", [
        {
            name: "YouYube",
            value: `[Link](${client.youtube}`
        },
        {
            name: "Twitter",
            value: `[Link](${client.twitter}`
        },
        {
            name: "Dokumentacja",
            value: `[Link](${client.docsLink})`
        }
    ])
};

exports.help = {
    name: "social-media",
    description: "Wyswietla social-media bota",
    category: "bot",
}