exports.run = (client, message) => {
    message.channel.send({content: `Ping: \`${client.ws.ping}ms\``})
}
module.exports.help = {
    name: "ping",
    category: "bot",
    description: "Pokazuje ping bota",
}