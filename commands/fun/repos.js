const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
    /*
    https://api.github.com/users/Korrumz2PL/repos
        data:
     - id
     - node_id
     - name
     - full_nam
     - private
     - owner
     - html_url
     - description
     - fork
     - url
     -
     */
    const user = args[0]
    const repo = args[1]

    if (!user) return message.channel.send("Brak użytkownika")
    if (!repo) return message.channel.send("Nie podano repozytorium")

    /*
    fetch(`https://api.github.com/users/${user}/${repo}`)
        .then(res => res.json())
        .then(json => {
            console.log(json.name)
        })

     */

    message.channel.send("soon:tm:")
}
exports.help = {
    name: "repos",
    description: "Wyswietla statystyki repozytorium na platformie GitHub",
    category: "fun",
}