const figlet = require("figlet")

exports.run = async (client, message, args) => {
    let text = args.join('\n')
    if (!text) return client.sender(message, "Błąd!", "Nie podano argumentów!", "", "GREEN", "", "")

    figlet(text, function(err, data) {
        if (err) return message.channel.send(`Błąd krytyczny!\n\`\`\`${err}\`\`\``)

        client.sender(message, "", `\`\`\`${data}\`\`\``, "", "GREEN", "")
    })
}
exports.help = {
    name: "ascii",
    description: "Generuje tekst ascii",
    category: "fun"
}