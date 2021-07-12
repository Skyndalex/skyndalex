const Discord = require("discord.js");

exports.run = (client, message, args) => {
   message.channel.send("Support został przeniesiony. Napisz na prywatnym czacie do bota argument: \`support\` aby uzyskać pomoc.\n Uwaga: **Musisz mieć odblokowane wiadomości prywatne, aby móc napisać**")
};

exports.help = {
    name: "support",
    description: "Poradnik do supportu",
    category: "bot",
    aliases: ["botpomoc"]
}