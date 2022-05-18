const { SlashCommandBuilder } = require('@discordjs/builders');
const {Modal, TextInputComponent, MessageActionRow} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("custom")
        .setDescription("Customization settings")
        .addSubcommand(subcommand =>
            subcommand
                .setName("buttons")
                .setDescription("Buttons customization settings")
                .addStringOption(option => option.setName("button").setDescription("Button")
                        .addChoices(
                            { name: "test button", value: "test_button"}
                        )
                    ))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName("messages")
                        .setDescription("Messages customization settings")
                        .addStringOption(option => option.setName("message").setDescription("Message")
                            .addChoices(
                                { name: "test message", value: "test_message"}
                            )
                        )
                ),
    async execute(client, interaction) {

        switch (interaction.options.getSubcommand()) {
            case "buttons":
                let buttonChoices = await interaction.options.getString("button")

                switch (buttonChoices) {
                    case "test_button":
                        const testButtonCustomization = new Modal()
                            .setTitle("Customization buttons")
                            .setCustomId("custom_buttons_settings_modal")

                        const buttonStyleLabel = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("PRIMARY/SECONDARY/SUCCESS/DANGER/LINK")
                            .setCustomId("button_style_setting_label")
                            .setLabel("Button style")

                        const buttonLabelLabel = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("String")
                            .setCustomId("button_label_setting_label")
                            .setLabel("Button label")

                        const ACTION_ROW = new MessageActionRow().addComponents(buttonStyleLabel)
                        const ACTION_ROW1 = new MessageActionRow().addComponents(buttonLabelLabel)

                        testButtonCustomization.addComponents(ACTION_ROW, ACTION_ROW1)

                        await interaction.showModal(testButtonCustomization)
                        break;
                    default:
                        await interaction.reply("Please choose option from choices list.")
                        break;
                }
                break;
        }
    }
}