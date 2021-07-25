const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
exports.run = async (client, message) => {
    fetch('https://memy.jeja.pl/losowe').then(res => res.text()).then(body => {
            const root = parse(body)
            const img = parse(root.querySelector('.ob-left-image').toString())
            const mem = img.querySelector('img').getAttribute('src')

            client.sender(message, "Wygenerowano", "", "Źródło: jeja.pl", "GREEN", "", mem)

        })
}
exports.help = {
    name: "jeja",
    description: "Generuje obrazek z jeja",
    category: "fun",
}