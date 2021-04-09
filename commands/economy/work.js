const Discord = require("discord.js-light");
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
        let luck = (Math.floor(Math.random() * (85 - 0) + 0))

        const embed = new Discord.MessageEmbed()
            .setDescription(`Otrzymujesz ${luck} monet`)
            .setColor("GREEN")
    message.channel.send(embed)

      r.table("economy").insert({
        money: luck,
        userid: message.author.id,
    }).run(client.con)

    const d = await r.table("economy").get(message.author.id).run(client.con)
    console.log(d)
   r.expr(d.money).add(luck).update({money: luck}).coerceTo("number").run(client.con)

}
exports.help = {
    name: "work",
    aliases: ["pracuj"],
    category: "economy",
}