const Discord = require("discord.js");
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    let reward = (Math.floor(Math.random() * (1000 - 0) + 0))

    const embed = new Discord.MessageEmbed()
        .setDescription("Odebrano codzienną nagrodę!")
        .addField("Odebrano monet", reward)
        .addField("Odebrał", message.author.id)
        .setColor("GREEN")
    message.channel.send(embed)

    r.table("economy").insert({
        money: reward,
        userid: message.author.id,
    }).run(client.con)

    const d = await r.table("economy").get(message.author.id).run(client.con)

    r.table("economy").update({money: d.money + reward}).run(client.con)


}
exports.help = {
    name: "daily-reward",
    aliases: ["daily"],
    category: "economy",
}