const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("sus command"),
    async execute(client, interaction) {
        let embed = new MessageEmbed()
            .setTitle("Set title: title")
            .setDescription(`\`desc [string]\``)
        await interaction.reply({ embeds: [embed] });

        const filter = m => m.author.id === interaction.user.id;
        let collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

        collector.on("collect", async m => {
            const titleStr = m.content.slice("title".length).trim().split(/ +/);
            const descStr = m.content.slice("desc".length).trim().split(/ +/);

            if (m.content.startsWith("title")) {
                let embedTitleEdit = new MessageEmbed()
                    .setTitle(`${titleStr.join(" ")}`)
                await interaction.editReply({ embeds: [embedTitleEdit], content: "✅ Success!" })
            } else {
                if (m.content.startsWith("desc")) {
                    let embedTitleEdit2 = new MessageEmbed()
                        .setTitle(`${titleStr.join(" ")}`)
                        .setDescription(`${descStr.join(" ")}`)
                    await interaction.editReply({ embeds: [embedTitleEdit2], content: "✅ Success!" })
                }
            }
        })
    }
}