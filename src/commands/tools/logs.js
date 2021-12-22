const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "logs",
    description: "Logs settings.",
    options: [
        { name: "set", description: "Logs settings", type: 2, options: [
                { name: "channel", description: "Choose your channel type", type: 1, options: [
                        { name: "channelcreate", description: "Channel create log", type: 7 },
                        { name: "channeldelete", description: "Channel delete log", type: 7 },
                        { name: "channelupdate", description: "Channel update log", type: 7 }
                    ]},
                { name: "value", description: "Set welcome title, description and goodbyes title, description", type: 1, options: [
                        { name: "welcome_embed_title", description: "Welcome embed title", type: 7 },
                        { name: "welcome_embed_description", description: "Welcome embed description ", type: 7 },
                        { name: "goodbye_embed_title", description: "Goodbye embed title ", type: 7 },
                        { name: "goodbye_embed_description", description: "Goodbye embed description", type: 7 }
                    ]}
            ]},
        { name: "help", description: "Logs help", type: 1 },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});

    }
};