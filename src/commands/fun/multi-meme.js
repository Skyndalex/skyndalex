const fetch = require("node-fetch")
const { parse } = require('node-html-parser')
exports.run = async (client, message, args) => {
    switch (args[0]) {
        case 'jeja':
            fetch('https://memy.jeja.pl/losowe')
                .then(res => res.text())
                .then(body => {
                    const root = parse(body)
                    const img = parse(root.querySelector('.ob-left-image').toString())
                    const mem = img.querySelector('img').getAttribute('src')

                    client.sender(message, "Wygenerowano", "", "Źródło: jeja.pl", "GREEN", "", mem)

                })
            break;
        case 'memy':
            fetch('https://memy.pl/losuj')
                .then(res => res.text())
                .then(body => {
                    const root = parse(body)
                    const img = parse(root.querySelector('.meme-item figure').toString())
                    const mem = img.querySelector('img').getAttribute('src')

                    client.sender(message, "Wygenerowano", "", "Źródło: memy.pl", "GREEN", "", mem)

                })
            break;
        default:
            client.sender(message, "Dostępne serwisy", "", "", "GREEN", [
                {
                    name: "\`jeja\`",
                    value: "Wylosuj mema z strony **jeja.pl**"
                },
                {
                    name: "\`memy\`",
                    value: "Wylosuj mema z strony **memy.pl**"
                }
            ])
    }
}
exports.help = {
    name: "multi-meme",
    description: "Losuje mema z wybranej strony internetowej.",
    category: "fun",
}