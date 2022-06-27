const { Modal, TextInputComponent, MessageActionRow, MessageEmbed } = require("discord.js");
const axios = require("axios");
const hastebin = require("hastebin");

module.exports = async (client, interaction) => {
    const getCardIDsModal = new Modal()
        .setTitle("Get card IDs")
        .setCustomId("getCardIDsModal")

    const getCardIDsModalComponents = new TextInputComponent()
        .setStyle("SHORT")
        .setRequired(true)
        .setPlaceholder("Board ID")
        .setMaxLength(100)
        .setCustomId("get_card_ids_board")
        .setLabel("Board id")

    const getCardIDsActionRow = new MessageActionRow().addComponents(getCardIDsModalComponents)

    getCardIDsModal.addComponents(getCardIDsActionRow)

    await interaction.showModal(getCardIDsModal)

    const filter = (interaction) => interaction.customId === "getCardIDsModal";

    await interaction.awaitModalSubmit({ filter, time: 15000 }).then(async interaction => {
        let boardID2 = interaction.fields.getTextInputValue("get_card_ids_board")

        await axios.get(`https://trello.com/b/${boardID2}.json`)
            .then(async function (response) {
                let list = [];
                for (let x in response.data.cards) {
                    list.push(`${response.data.cards[x].name} : ${response.data.cards[x].id}`)
                }

                if (list.length > 2000) {
                    hastebin.createPaste(`(CTRL + F to search)\nCard name : Card ID\nBoard name: ${response.data.name}\nDescription: ${response.data.desc}\n\n${list.join(",\n")}`, {
                        raw: true,
                        contentType: 'text/plain',
                        server: 'https://hastebin.com'
                    }, {})
                        .then(async function (urlToPaste) {
                            interaction.channel.send({content: `\`\`\`ansi\n[0;31mYour message is too long, so I've moved the reply elsewhere.\nHaste: ${urlToPaste}\`\`\``});
                        })
                } else {
                    if (list.length < 2000) {
                        let embed = new MessageEmbed()
                            .setAuthor({name: `Found ${list.length} cards.`})
                            .setTitle("\`Card NAME : Card ID\`")
                            .setDescription(`\`\`\`ansi\n[0;34m${list.join(",\n")}\`\`\``)
                            .setColor("YELLOW")
                        interaction.reply({embeds: [embed]})
                    }
                }
            })
    });
}