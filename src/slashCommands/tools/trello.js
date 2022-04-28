const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed} = require("discord.js");

module.exports = { // TODO: remove sub commands and rewrite to choices.
    data: new SlashCommandBuilder()
        .setName("trello")
        .setDescription("Trello manager")
        .addStringOption(option => option.setName("add").setDescription("Add options")
            .addChoices(
                { name: 'addCard', value: 'add_card_choice' },
                { name: 'addAttachmentToCard', value: 'add_attach_to_card'}
            )),


    async execute(client, interaction) {
        const add = await interaction.options.getString("add");

        switch (add) {
            case "add_card_choice":
                const filter = m => m.author.id === interaction.user.id;
                const collector = await interaction.channel.createMessageCollector({ filter, time: 15000 });

                let embedNotify = new MessageEmbed()
                    .setTitle("✅ Created message collector")
                    .setDescription(client.strings.trello.NOTIFICATION_COMMAND_USE)
                    .setFooter({ text: "Full trello guide: https://docs.skyndalex.xyz/trello" })
                    .setColor("GREEN")
                await interaction.reply({ embeds: [embedNotify] });

                collector.on("collect", async m => {
                    const name = m.content.slice("name".length).trim().split(/ +/);
                    const desc = m.content.slice("description".length).trim().split(/ +/);

                    if (m.content.startsWith("name")) {

                        let embedCardAddNameEdit = new MessageEmbed()
                            .setDescription(`\`\`\`ansi\n\u001B[1;34;40m Successfully choosed card name: ${name.join(" ")} \`\`\``)
                            .setColor("GREEN")
                        await interaction.editReply({ embeds: [embedCardAddNameEdit]})
                    }
                    if (m.content.startsWith("desc")) {
                        let embedCardAddDescEdit = new MessageEmbed()
                            .setDescription(`\`\`\`ansi\n\u001B[1;34;40m Successfully choosed card name: ${name.join(" ")}\nSuccessfully choosed card description: ${desc.join(" ")} \`\`\``)
                            .setColor("GREEN")
                        await interaction.editReply({ embeds: [embedCardAddDescEdit]})
                    }
                })
                break
        }
    }
}