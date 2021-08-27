const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return client.sender(message, "Potrzebujesz permisji:\n\`global.gban\`")

    let target = message.mentions?.members.first()

    await r.table("gbans").insert({ userid: target.id, gbanReason: args.join(" ").slice(1) }).run(client.con)

    message.reply("nadano gbana szefie")
}
exports.help = {
    name: "gban",
    category: "dev",
    description: "daje gbana użytkownikowi"
}