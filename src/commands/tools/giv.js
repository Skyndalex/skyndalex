const ms = require("ms")
const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("Nie masz permisji do rozpoczęcia konkursu!")

    // https://stackoverflow.com/questions/62086666/discord-js-bot-giveaway-command-embedsent-reactions-get-is-not-a-function

    const channel = await r.table("settings").get(message.guild.id)("giveawayChannel").default(message.channel.id).run(client.con)
    if (!channel) return message.channel.send("Nie ustawiono kanału!")

    const messageArray = message.content.split(" ");
    let item = "";
    let time;

   // let founder = args[2]

    let winnerCount;
    for (let i = 1; i < args.length; i++) {
        item += (args[i] + " ");
    }
    time = args[0]

    if (!time) return message.channel.send("Nie podano czasu!")
    if (!item) return message.channel.send("Nie podano nagrody!")


    const embed = new Discord.MessageEmbed();
    embed.setColor(0x3333ff);
    embed.setTitle("Nowy giveaway!");
    embed.setDescription(`Do wygrania: **${item}**`);
    embed.addField(`Czas trwania:`, ms(ms(args[0]), {
        long: true
    }), true);
    embed.addField("Organizator", message.author.tag)
    embed.setFooter("Zareaguj reakcję aby dołączyć");
    const embedSent = await client.channels.cache.get(channel).send(embed)
    embedSent.react("🎉");

    setTimeout(async () => {
        try{
            const peopleReactedBot = await embedSent.reactions.cache.get("🎉").users.fetch();
            var peopleReacted = peopleReactedBot.array().filter(u => u.id !== client.user.id);
        } catch(e) {
            return message.channel.send(`Wystąpił jakiś błąd (\`${item}\`) : `+"`"+e+"`")
        }
        let winner;

        if (peopleReacted.length <= 0) {
            return client.sender(message, "Nie można wylosować!", "Zbyt mało osób wzięło udział w giveawayu!", "", "RED", "", "")
        } else {
            const index = Math.floor(Math.random() * peopleReacted.length);
            winner = peopleReacted[index];
        }
        if (!winner) {
            message.channel.send(`Błąd z **${item}**`);
        } else {
            message.channel.send(`<@${winner.id}>`).then(m => {
                m.delete({timeout: 1000})
            })
            client.sender(message, "Wygrano giveaway!", `🎉 **${winner.toString()}** wygrał **${item}**! Gratulacje!`, "", "0x3333ff", "", "")
        }
    }, ms(timeFromDB));
}
exports.help = {
    name: "giv",
    description: "Tworzy giveaway.",
    category: "tools",
}