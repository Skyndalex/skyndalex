const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js");
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
                            .setPlaceholder("e.g PRIMARY/SECONDARY/SUCCESS/DANGER/LINK")
                            .setCustomId("button_style_setting_label")
                            .setLabel("Button style")

                        const buttonLabelLabel = new TextInputComponent()
                            .setStyle("SHORT")
                            .setRequired(true)
                            .setPlaceholder("String")
                            .setCustomId("button_label_setting_label")
                            .setLabel("Button label")

                        const buttonDisabled = new TextInputComponent()
                            .setStyle("SHORT")
                            .setPlaceholder("true/false")
                            .setCustomId("button_disable_setting_label")
                            .setLabel("Is disabled?")

                        const ACTION_ROW = new MessageActionRow().addComponents(buttonStyleLabel)
                        const ACTION_ROW1 = new MessageActionRow().addComponents(buttonLabelLabel)
                        const ACTION_ROW2 = new MessageActionRow().addComponents(buttonDisabled)

                        testButtonCustomization.addComponents(ACTION_ROW, ACTION_ROW1, ACTION_ROW2)

                        await interaction.showModal(testButtonCustomization)

                        await interaction.awaitModalSubmit({ time: 15_000 }).catch(e => interaction.reply("There was some kind of error while uploading the modal. Are you sure you made it in time?"))
                            .then(async interaction =>
                           // interaction.reply(`Style: ${interaction.fields.getTextInputValue("button_style_setting_label")}`)

                                await r.table("customizationSystem").insert({
                                    id: interaction.guild.id,
                                    buttonId: "test",
                                    buttonStyle: interaction.fields.getTextInputValue("button_style_setting_label"),
                                    buttonLabel: interaction.fields.getTextInputValue("button_label_setting_label"),
                                    btnDisabled: interaction.fields.getTextInputValue("button_disable_setting_label")
                                }, { conflict: "update" }).run(client.con)
                            );

                        let check = await r.table("customizationSystem").get(interaction.guild.id).run(client.con);
                        let embedSuccessfull = new MessageEmbed()
                            .setTitle(`\`successfully changed the data in the database.\``)
                            .addField(`Button style`, String(check.buttonStyle))
                            .addField(`Button label`, String(check.buttonLabel))
                            .addField(`Is disabled?`, String(check.btnDisabled || "None"))
                        await interaction.channel.send({ embeds: [embedSuccessfull] })
                        break;
                    default:
                        let embedError = new MessageEmbed()
                            .setTitle("\`[ NoArgumentsError ]\` Please choose option from choices list.")
                            .setColor("DARK_ORANGE")
                        await interaction.reply({ embeds: [embedError], ephemeral: true })
                        break;
                }
                break;
        }
    }
}