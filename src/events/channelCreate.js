const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "channelCreate",
    once: false,

    async execute(client, channel) {
        const dataTable = await r.table("logs").get(channel.guild.id).run(client.con);
        if (!dataTable.channelCreateLog) return;

    }
}