const { MessageEmbed } = require("discord.js");
/* endpoints
    https://api.kaczkoland.pl/v2/u/<nick>
    https://api.kaczkoland.pl/v2/getTopPlayers
    https://api.kaczkoland.pl/v2/getSumData
    wss://api.kaczkoland.pl/v2/ws
*/
module.exports = {
    name: "kaczkoland",
    description: "Kaczkoland.PL Polish minecraft server stats",
    options: [
        { name: "view", description: "View player stats", type: 2, options: [
                { name: "currentstats", description: "All current server stats", type: 1 },
                { name: "top", description: "Top ", type: 1, options: [
                        { name: "mode", description: "Choice top options", required: true, type: "STRING", choices: [
                                { name: "money", value: "top_money" },
                                { name: "mined_blocks", value: "top-mined_blocks" },
                                { name: "placed_blocks", value: "top-placed_blocks" },
                                { name: "crafted_items", value: "top-crafted_items" },
                                { name: "killed_mobs", value: "top-killed_mobs" },
                                { name: "played_time", value: "top-played_time" }
                            ]}
                    ]},
                { name: "single-player", description: "Single-Player stats", type: 1, options: [
                        { name: "playerstring", description: "Minecraft username", type: 7 }
                    ]},
            ]},
    ],
    run: async (client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case "currentstats":
                fetch ("https://api.kaczkoland.pl/v2/getSumData")
                    .then(res => res.json())
                    .then(async res => {
                        let embed = new MessageEmbed()
                            .setTitle("Total Kaczkoland stats")
                            .setDescription("Data from [\`api\`](https://api.kaczkoland.pl/v2/getSumData).")
                            .addField("Mined blocks", `\`${res.data.minedBlocks}\``, true)
                            .addField("Placed blocks", `\`${res.data.placedBlocks}\``, true)
                            .addField(`Crafted items`, `\`${res.data.craftedItems}\``, true)
                            .addField(`All deaths`, `\`${res.data.allDeaths}\``, true)
                            .addField(`Killed mobs`, `\`${res.data.killedMobs}\``, true)
                            .addField(`Mined diamonds`, `\`${res.data.minedDiamonds}\``, true)
                            .addField(`Total users (old lobby stats, before the start of survival)`, `\`${res.data.totalUsers}\``, true)
                            .addField(`Total money`, `\`${res.data.money}$\``, true)
                            .setColor("GREEN")
                        await interaction.reply({ embeds: [embed] })
                    })
                break;
            case "top":
                switch (interaction.options.getString("mode")) {
                    case "top-mined_blocks":
                        fetch ("https://api.kaczkoland.pl/v2/getTopPlayers")
                            .then(res => res.json())
                            .then(async res => {
                                let data = [];
                                for (let i in res.data.minedBlocks) {
                                    data.push(res.data.minedBlocks[i].player.name);
                                };

                                let embed = new MessageEmbed()
                                    .setTitle(`Mined blocks - Top (1 - 5)`)
                                    .setDescription(`\`\`\`${data.join(",\n").toString()}\`\`\``)
                                    .setColor("DARK_BUT_NOT_BLACK")
                                await interaction.reply({ embeds: [embed] })
                            })
                    case "top_money":
                        fetch ("https://api.kaczkoland.pl/v2/getTopPlayers")
                            .then(res => res.json())
                            .then(async res => {
                                let data = [];
                                for (let i in res.data.money) {
                                    data.push(res.data.money[i].player.name);
                                };

                                let embed = new MessageEmbed()
                                    .setTitle(`Money - Top (1 - 5)`)
                                    .setDescription(`\`\`\`${data.join(`,\n`)}\`\`\``)
                                    .setColor("DARK_BUT_NOT_BLACK")
                                await interaction.reply({ embeds: [embed] })
                            })
                        break;
                }
        }
    }
};