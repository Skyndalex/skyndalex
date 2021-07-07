exports.run = (client, message, args) => {
    message.channel.send("[Lista permisji została przeniesiona do dokumentacji](https://docs.krivebot.xyz/pl/permissions)")
};

exports.help = {
    name: "permissions",
    description: "Lista permisji",
    category: "tools",
    aliases: ["ustaw"]
}