const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "kaczkoland",
    description: "Kaczkoland.PL Polish minecraft server stats",
    options: [
        { name: "view", description: "View player stats", type: 2, options: [
                { name: "currentguildstats", description: "All server stats", type: 1 },
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

    },
};