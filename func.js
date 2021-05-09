const Discord = require("discord.js")
module.exports = (client) => {
    client.commandNotEnabled = (message, text) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Komenda wyłączona!")
            .setDescription(`Z powodu: ${text.replace(client.token, '[token]')}`)
            .setColor("RED")
        return message.channel.send(embed)
    }
      Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
    // client.awaitReply TYMCZASOWO przepisane z starej wersji Skyndalexa 3.0 (2020)
    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first();
        } catch (e) {
            return false;
        }
    };

}