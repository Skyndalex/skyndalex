const {MessageEmbed} = require("discord.js");
exports.run = async (client, interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId !==`testModal-${interaction.id}`) return

    let embed = new MessageEmbed()
    if (interaction.fields.getTextInputValue("title")) embed.setTitle(interaction.fields.getTextInputValue("title"))
    if (interaction.fields.getTextInputValue("desc")) embed.setDescription(interaction.fields.getTextInputValue("desc"))
    if (interaction.fields.getTextInputValue("color")) embed.setColor(interaction.fields.getTextInputValue("color" || "DEFAULT"))
    if (interaction.fields.getTextInputValue("footer")) embed.setFooter({ text: interaction.fields.getTextInputValue("footer")})
    if (interaction.fields.getTextInputValue("author")) embed.setAuthor({ name: interaction.fields.getTextInputValue("author")})
    interaction.reply({ embeds: [embed]})
}