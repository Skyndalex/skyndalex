const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed builder"),
    async execute(client, interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('embed-builder')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        { label: 'Title', description: 'Embed title', value: 'embed_builder_title' },
                        { label: 'Description',  description: 'Embed description', value: 'embed_builder_description' },
                        { label: 'Footer', description: 'Embed footer', value: 'embed_builder_footer' },
                        { label: 'Author', description: 'Embed author', value: 'embed_builder_author'},
                        { label: 'Author IMG', description: 'Embed author image', value: 'embed_builder_author_image' },
                        { label: 'Thumbnail', description: 'Embed Thumbnail', value: 'embed_builder_thumbnail' },
                        { label: 'URL', description: 'Embed URL', value: 'embed_builder_url' }
                    ]),
            )

        const embed = new MessageEmbed()
            .setTitle("Build your embed")
            .setDescription("Choose options from messagemenu.")
            .setColor("DARK_BUT_NOT_BLACK")
        await interaction.reply({ embeds: [embed], components: [row] })
    }
}