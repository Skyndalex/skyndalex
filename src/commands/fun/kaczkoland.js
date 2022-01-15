const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch")
/* endpoints
    https://api.kaczkoland.pl/v2/u/<nick>
    https://api.kaczkoland.pl/v2/getTopPlayers
    https://api.kaczkoland.pl/v2/getSumData
*/
module.exports = {
    name: "kaczkoland",
    description: "Kaczkoland.PL Polish minecraft server stats",
    options: [
        { name: "view", description: "View player stats", type: 2, options: [
                { name: "currentstats", description: "All current server stats", type: 1 },
                { name: "top", description: "Top ", type: 1, options: [
                        { name: "mode", description: "Choice top options", required: true, type: 3, choices: [
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
        if (interaction.options.getSubcommand() === "currentstats") {
             fetch("https://api.kaczkoland.pl/v2/getSumData")
                 .then(res => res.json())
                 .then(async res => {
                     let embed = new MessageEmbed()
                         .setTitle("Total Kaczkoland stats")
                         .setDescription("Data from [api](https://api.kaczkoland.pl/v2/getSumData)")
                         .addField("Mined blocks", `\`${res.data.minedBlocks}\``, true)
                         .addField("Placed blocks", `\`${res.data.placedBlocks}\``, true)
                         .addField(`Crafted items`, `\`${res.data.craftedItems}\``, true)
                         .addField(`All deaths`, `\`${res.data.allDeaths}\``, true)
                         .addField(`Killed mobs`, `\`${res.data.killedMobs}\``, true)
                         .addField(`Mined diamonds`, `\`${res.data.minedDiamonds}\``, true)
                         .addField(`Total users`, `\`${res.data.totalUsers}\``, true)
                         .addField(`Total money`, `\`${res.data.money}\``, true)
                         .setColor("GREEN")
                     await interaction.reply({ embeds: [embed] })
                 })
        }
    }
};