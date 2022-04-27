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

                await interaction.reply("\`\`\`ansi\n[1;31;44mNOTIFICATION\n\n[0;32mType 'name [string]' to choose your trello card name\nType 'description [desc]' to choose your trello card description\`\`\`")
                const collector = await interaction.channel.createMessageCollector(m => m.author.id === interaction.user.id);

                collector.on("collect", m => {

                    if (m.content.startsWith("name ")) {
                        m.reply({ content: `Card name: ${m.content}`})
                    }
                    if (m.content.startsWith("description ")) {
                        m.reply({ content: `Card description: ${m.content}`})
                    }
                })
                break
        }
    }
}
