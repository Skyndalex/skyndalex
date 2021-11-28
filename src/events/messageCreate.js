const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
module.exports = {
    name: "messageCreate",
    once: false,

    async execute (client, message) {
        const prefixMention = new RegExp(`^<@!?${client.user.id}>(|)$`);
        const data = await r.table("settings").get(message.guild.id).run(client.con);

        const mention = new MessageEmbed()
            .setDescription(`Documentation: [Link](https://docs.krivebot.xyz)\nPrefix: \`/\``)
            .setColor("DARK_BUT_NOT_BLACK")
        if (message.content.match(prefixMention)) {
            return message.channel.send({embeds: [mention]});
        };

        if (message.channel.id === data?.imagesChannel) {
            if (message.attachments.size === 0) {
                message.delete()
            }};

        const prefix = "b.";

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === "eval") {
            let prodef = ["817883855310684180"];
            if (!prodef.includes(message.author.id)) return message.reply(client.strings.dev.eval.error_eval_permissions);

            if (!args) return message.channel.send("Enter code")

            let cToken = new RegExp(client.token, "g");

            const clean = text => {
                if (typeof text === "string") {
                    return text
                        .replace(/`/g, "`" + String.fromCharCode(8203))
                        .replace(/@/g, "@" + String.fromCharCode(8203))
                        .replace(cToken, "g");
                } else {
                    return text;
                }
            };

            try {
                const code = args.join(" ")
                let evaled = eval(code);

                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
                message.channel.send({content: `\`\`\`js\n${clean(evaled)}\`\`\``});

            } catch (err) {
                message.channel.send({content: `\`\`\`js\n${clean(err)}\n\`\`\``});
            }
        }
    }
}