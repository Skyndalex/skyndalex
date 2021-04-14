const Discord = require("discord.js");
const r = require("rethinkdb")
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args) => {
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
        const remaining = humanizeDuration(cooldown - Date.now());

        return client.error(message, `Musisz jeszcze poczekać ${remaining} aby użyć ponownie tej komendy!`)
            .catch(console.error);
    } else {


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
    cooldowns.set(message.author.id, Date.now() + 180);
    setTimeout(() => cooldowns.delete(message.author.id), 43200000);
}
exports.help = {
    name: "daily-reward",
    aliases: ["daily"],
    category: "economy",
}