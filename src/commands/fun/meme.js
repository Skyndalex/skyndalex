const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
exports.run = async (client, message) => {
    fetch('https://memy.pl/losuj')
        .then(res => res.text())
        .then(body => {
            const root = parse(body)
            const img = parse(root.querySelector('.meme-item figure').toString())
            const mem = img.querySelector('img').getAttribute('src')

            client.sender(message, "Wygenerowano", "", "Źródło: memy.pl", "GREEN", "", mem)

        })
}
exports.help = {
    name: "meme",
    description: "Generuje obrazek z memem",
    category: "fun",
}