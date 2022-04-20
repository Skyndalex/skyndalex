const { MessageEmbed } = require('discord.js');
module.exports = (client, message) => {
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    const prefix = "s.";

    const mention = new MessageEmbed()
        .setDescription("My prefix is \`/\`")
        .setColor('DARK_BUT_NOT_BLACK')
        .setTimestamp();
    if (message.content.match(prefixMention)) message.channel.send({ embeds: [mention], ephemeral: true });

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (cmd) cmd.run(client, message)
};
