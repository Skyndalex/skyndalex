const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return client.sender(message, "Potrzebujesz permisji:\n\`global.gban\`")

    await r.table("gbans").insert({ userid: args[0] }).run(client.con)

    message.reply("nadano gbana")
}
exports.help = {
    name: "gban",
    category: "dev",
    description: "daje gbana użytkownikowi"
}