const Discord = require("discord.js");

exports.run = (client, message, args) => {
   message.channel.send("Soon")
};

exports.help = {
    name: "support",
    description: "Poradnik do supportu",
    category: "bot",
    aliases: ["botpomoc"]
}