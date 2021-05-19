const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    message.channel.send("Wybierz tryb ogłoszenia\n\`Normal\` - normalne\n\`Urgent\` - pilne").then(() => {
          message.channel.awaitMessages(response => response.content === "normal", {
              max: 1,
              time: 30000,
              errors: ['time']
          }).then(async(collected) => {
              message.channel.send("ŻĄDANE: \`broadcastText\`. Należy napisać treść ogłoszenia! Napisz w wiadomości poniżej!")

              })
        message.channel.awaitMessages(response => response.content === "urgent", {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then((collected) => {
            message.channel.send("urgent message");
        })
        })
}
exports.help = {
    name: "broadcast-setup",
    description: "Bardziej zaawansowane ogłoszenia",
    category: "tools",
}