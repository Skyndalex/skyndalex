const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
exports.run = async (client, message) => {
    fetch('https://komixxy.pl/326827')
        .then(res => res.text())
        .then(body => {
                const root = parse(body)
                const img = parse(root.querySelector('.picwrapper').toString())
                const mem = img.querySelector('img').getAttribute('src')

                client.sender(message, "Wygenerowano", "", "Źródło: komixxy.pl", "GREEN", "", mem)
        })
}
exports.help = {
    name: "komiks",
    description: "Generuje komiks",
    category: "fun",
}