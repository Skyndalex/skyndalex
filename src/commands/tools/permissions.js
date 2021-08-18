exports.run = (message) => {
    message.channel.send("Lista permisji została przeniesiona do dokumentacji: https://docs.krivebot.xyz/perms/")
};

exports.help = {
    name: "permissions",
    description: "Lista permisji",
    category: "tools",
    aliases: ["ustaw"]
}