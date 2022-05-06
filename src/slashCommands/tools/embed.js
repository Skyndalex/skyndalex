const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed builder"),
    async execute(client, interaction) {
        const submitInteraction = require("./modals/embedBuilders/embed.js").run(client, interaction)

        let embed = new MessageEmbed()
        if (submitInteraction.fields.getTextInputValue("title")) embed.setTitle(submitInteraction.fields.getTextInputValue("title"))
        if (submitInteraction.fields.getTextInputValue("desc")) embed.setDescription(submitInteraction.fields.getTextInputValue("desc"))
        if (submitInteraction.fields.getTextInputValue("color")) embed.setColor(submitInteraction.fields.getTextInputValue("color" || "DEFAULT"))
        if (submitInteraction.fields.getTextInputValue("footer")) embed.setFooter({ text: submitInteraction.fields.getTextInputValue("footer")})
        if (submitInteraction.fields.getTextInputValue("author")) embed.setAuthor({ name: submitInteraction.fields.getTextInputValue("author")})

        return submitInteraction.reply({ embeds: [embed] })
    }
}