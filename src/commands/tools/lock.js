const r = require("rethinkdb")
exports.run = (client, message, args) => {
    
}
exports.help = {
    name: "lock",
    usage: "lock",
    perms: "server.manage_channels.lock",
    category: "tools",
    description: "Blokowanie kanału",
}