const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
    fetch('https://some-random-api.ml/img/fox')
        .then(res => res.json())
        .then(res => {
            client.sender(message, "Wygenerowano", "", "", "GREEN", "", res.link)
        })
};
exports.help = {
    name: "fox",
    description: "Generuje słodkiego liska",
    perms: "server.send_messages.fox",
    category: "fun"
}