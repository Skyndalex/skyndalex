const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const table = await r.table("economy").get(message.author.id).run(client.con)
    switch (args[0]) {
        default:
            client.sender(message, "", "**Dołącz do pracy**\n\nLista prac:\n\n\`jobs developer\` === Dołącz do pracy: Programista\n\`jobs miner\` === Dołącz do pracy: Górnik", "Ekonomia", "GREEN", "")
            break;
        case 'developer':
            if (table?.job) return message.reply({content: "Jesteś już w pracy"})

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('jobs_developer_join')
                        .setLabel('Tak')
                        .setStyle('DANGER')
                )
            const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('jobs_developer_no')
                        .setLabel('Nie')
                        .setStyle('DANGER')
                )
            const embed = new MessageEmbed()
                .setTitle("Na pewno?")
                .setDescription("Czy na pewno chcesz dołączyć do pracy: **Programista**?\n\n**UWAGA!**\nTen proces jest nieodwracalny.")
                .setColor("YELLOW")
            message.reply({
                embeds: [embed],
                components: [
                    row, row2
                ]
            })
            break;
        case 'miner':
            if (table?.job) return message.reply({content: "Jesteś już w pracy."})

            const row3 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('jobs_miner_join')
                        .setLabel('Tak')
                        .setStyle('DANGER')
                )
            const row4 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('jobs_miner_no')
                        .setLabel('Nie')
                        .setStyle('DANGER')
                )
            const embed2 = new MessageEmbed()
                .setTitle("Na pewno?")
                .setDescription("Czy na pewno chcesz dołączyć do pracy: **Górnik**?\n**UWAGA!**\n\nTen proces jest nieodwracalny.")
                .setColor("YELLOW")
            message.reply({
                embeds: [embed2],
                components: [
                    row3, row4
                ]
            })
            break;
    }
}
exports.help = {
    name: "jobs",
    usage: "jobs",
    perms: "global.send_messages.jobs",
    category: "economy",
    description: "Wybierz swoją prace ",
}