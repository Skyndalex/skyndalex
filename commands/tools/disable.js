const r = require("rethinkdb")
exports.run = async (client, message, args, level) => {
    let command = args[0]

     const disabledCommand = await r.table("system").update({})
}
exports.help = {
    name: "disable",
    description: "Wyłącza komende",
    category: "tools",
}