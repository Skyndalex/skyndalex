const Discord = require("discord.js");

exports.run = (client, message, args) => {
   message.channel.send("Support został przeniesiony. Napisz na prywatnym czacie do bota słowo: \`support\` aby uzyskać pomoc.")
};

exports.help = {
    name: "support",
    description: "Poradnik do supportu",
    category: "bot",
    aliases: ["botpomoc"]
}