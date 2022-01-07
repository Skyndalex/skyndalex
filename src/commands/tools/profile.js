const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "profile",
    description: "Profile.",
    options: [
        { type: 1, name: "set", description: "Profile settings", options: [
                { name: "name", description: "Profile name setting", type: 3 },
                { name: "description", description: "Profile description setting", type: 3 },
                { name: "birthdate", description: "Profile birthday date setting", type: 3 },
                { name: "twitter", description: "Profile twitter setting", type: 3 },
                { name: "tiktok", description: "Profile tiktok setting", type: 3 },
                { name: "instagram", description: "Profile instagram setting", type: 3 },
                { name: "steam", description: "Profile steam setting", type: 3 },
                { name: "github", description: "Profile github setting", type: 3 },
                { name: "youtube", description: "Profile youtube setting", type: 3 },

            ]},
        { type: 1, name: "view", description: "Profile view"}
    ],

    run: async (client, interaction) => {
    }
};