const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("sus command"),
    async execute(client, interaction) {
        let embed = new MessageEmbed()
            .setTitle("Set title: title")
            .setDescription(`\`desc [string]\``)
        await interaction.reply({ embeds: [embed] })

        //  console.log(interaction)
        const filter = m => m.author.id === interaction.user.id;
        let collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

        collector.on("collect", async m => { // TODO: fix embed description
            const title = m.content.slice("title".length).trim().split(/ +/);
            const desc = m.content.slice("desc".length).trim().split(/ +/);

            try {
                if (m.content.startsWith("title")) {
                    let embedTitleEdit = new MessageEmbed()
                        .setTitle(`${title.join(" ")}`);

                    await interaction.editReply({embeds: [embedTitleEdit], content: "✅ Success!"})

                    // console.log(m)
                } else {
                    if (m.content.startsWith("desc")) {
                        let embedTitleEdit2 = new MessageEmbed()
                            .setTitle(`${title.join(" ")}`)
                            .setDescription(`${desc.join(" ")}`);

                        await interaction.editReply({embeds: [embedTitleEdit2], content: "✅ Success!"})
                    }
                }
            } catch (err) {
                await interaction.channel.send(err)
                console.log(err)
            }
        })
    }
}