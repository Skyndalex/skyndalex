const { SlashCommandBuilder, ContextMenuCommandBuilder} = require('@discordjs/builders');
const Trello = require("trello");
const {MessageEmbed, Modal, MessageActionRow, MessageButton} = require("discord.js");
exports.run = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);
    if (!db?.key) interaction.reply("Invalid trello account key!\nAuthorize: \`/trello auth\`");
    if (!db?.token) interaction.reply("Invalid trello application token!\nAuthorize: \`/trello auth\`");

    let manager = new Trello(db.key, db.token);

    switch (interaction.customId) {
        case "trello_add_card_confirm":
            if (interaction.message.interaction.user.id !== interaction.user.id) return interaction.reply({ content: "It's not your button!", ephemeral: true })
            let embed = interaction.message.embeds[0]

            let name = embed.fields[0].value;
            let desc = embed.fields[1].value;
            let listId = embed.fields[2].value;

            await manager.addCard(name, desc, listId,
                async function(error, trelloCard) {
                if (error) {
                    await interaction.reply(`\`\`\`${error}\`\`\``)
                } else {
                    let embedSuccessful = new MessageEmbed()
                        .setDescription(`\`[${name}]\` successfully added to trello list [\`${trelloCard.id}\`](${trelloCard.shortUrl})`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    await interaction.reply({ embeds: [embedSuccessful] })
                }
                }
            )
            // manager.addAttachmentToCard("", "", "")
            break;

    }
}