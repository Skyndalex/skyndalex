exports.run = async (client, message) => {
    const msg = await message.channel.send("Obliczam ping...");
    await msg.edit(`\`\`\`Ping: ${msg.createdTimestamp - message.createdTimestamp}\`\`\``);
};

exports.help = {
    name: "ping",
    description: "Ping bota",
    category: "bot",
}