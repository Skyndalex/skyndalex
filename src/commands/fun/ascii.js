const figlet = require('figlet');

exports.run = async (client, message, args) => {
    let text = args.join('\n');
    if (!text) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    figlet(text, function(err, data) {
        if (err) {
            return client.error(message, `\`\`\`${err}\`\`\``);
        }

        client.sender(message, "", `\`\`\`${data}\`\`\``, client.footer, "GREEN", "")
    })
};

exports.help = {
    name: "ascii",
    description: "Generuje tekst ascii",
    category: "fun"
}