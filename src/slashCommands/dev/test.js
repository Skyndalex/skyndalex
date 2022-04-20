const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("sus command"),
    async execute(client, interaction) {
            interaction.reply("hhhhhhh");

            const filter = m => m.author.id === interaction.user.id;
            let collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on("collect", m => {
                switch (m.content) {
                    case "h":
                        interaction.editReply({ content: "Dobrze!" })

                        collector.stop()
                        break;
                    default:
                        interaction.editReply({ content: "Błąd!" })

                        collector.stop()
                        break;
                }
            });
    }
}