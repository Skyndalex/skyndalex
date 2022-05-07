const axios = require("axios");
const {MessageEmbed} = require("discord.js");
exports.run = async (client, interaction) => {
    if (interaction.customId === `getCardIDsModal-${interaction.id}`) {
        if (!interaction.isModalSubmit()) return;

        let boardID2 = interaction.fields.getTextInputValue("boardId")

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
                    if (list.length < 2000 ) {
                        let embed = new MessageEmbed()
                            .setAuthor({ name: `Found ${list.length} cards.`})
                            .setTitle("\`Card NAME : Card ID\`")
                            .setDescription(`\`\`\`ansi\n[0;34m${list.join(",\n")}\`\`\``)
                            .setColor("YELLOW")
                        interaction.reply({ embeds: [embed] })
                    }
                }
            })
    }
}