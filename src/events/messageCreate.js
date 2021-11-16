const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageCreate",
    once: false,

    async execute(client, message) {

        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        const mention = new MessageEmbed()
            .setTitle("Hello! I'm Krive!")
            .setDescription(`You can find my commands in \`[/]\`\n\nDiscord support: https://discord.gg/WEas4WFjse\nStatuspage: https://status.krivebot.xyz\nDocumentation: https://docs.krivebot.xyz\nAll GitHub projects: https://github.com/KriveWasTaken/`)
            .setColor("GREEN")
        if (message.content.match(prefixMention)) {
            return message.channel.send({embeds: [mention]})
        }

        const prefix = "s."

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === "eval") {
             let prodef = ["817883855310684180"];
             if (!prodef.includes(message.author.id)) return message.reply({content: "Only the bot owner can use this command"});
             if (!args) return message.channel.send({content: "Enter code"})

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