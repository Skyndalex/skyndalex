const { MessageEmbed } = require("discord.js")
module.exports = (client) => {
    client.sender = async (message, text) => {
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Błąd!`)
            .setDescription(text.replace(client.token, '[dupa]'))
            .setColor('RED')
        return message.channel.send({embeds: embed})
    }

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first();
        } catch (e) {
            return false;
        }
    }
    Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
};