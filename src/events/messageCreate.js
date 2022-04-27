const { MessageEmbed } = require('discord.js');
module.exports = (client, message) => {
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    const mention = new MessageEmbed()
        .setDescription("My prefix is \`/\`")
        .setColor('DARK_BUT_NOT_BLACK')
        .setTimestamp();
    if (message.content.match(prefixMention)) message.channel.send({ embeds: [mention], ephemeral: true });

};
