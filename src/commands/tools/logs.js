/*
    type1 = SUB_COMMAND
    type2 = SUB_COMMAND_GROUP
    tyoe3 = STRING
    type7 = CHANNEL_OPTION
 */
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "logs",
    description: "Logs settings.",
    options: [
        { name: "set", description: "Logs settings", type: 2, options: [
                { name: "channel", description: "Choose your channel type", type: 1, options: [
                        { name: "channel_create", description: "Channel create log", type: 7 },
                        { name: "channel_delete", description: "Channel delete log", type: 7 },
                        { name: "channel_update", description: "Channel update log", type: 7 },
                        { name: "emoji_create", description: "Emoji create log", type: 7 },
                        { name: "emoji_delete", description: "Emoji delete log", type: 7 },
                        { name: "emoji_update", description: "Emoji update log", type: 7 },
                        { name: "role_create", description: "Role create log", type: 7 },
                        { name: "role_delete", description: "Role delete log", type: 7 },
                        { name: "role_update", description: "Role update log", type: 7 }
                    ]},
                { name: "value", description: "Set welcome title, description and goodbyes title, description", type: 1, options: [
                        { name: "welcome_embed_title", description: "Welcome embed title", type: 3 },
                        { name: "welcome_embed_description", description: "Welcome embed description ", type: 3 },
                        { name: "goodbye_embed_title", description: "Goodbye embed title ", type: 3 },
                        { name: "goodbye_embed_description", description: "Goodbye embed description", type: 3 }
                    ]}
            ]},
        { name: "help", description: "Logs help", type: 1 },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "You need permissions: \`MANAGE_CHANNELS\`"});
        /*
        TODO:
        - add IFs to global
        - Choices handling
        - Remove r.table(...) and replace it with the db tructure
         */

        if (interaction.options.getSubcommand() === "channel") {
            // channelCreateLog
                let channel_create = interaction.options.getChannel("channel_create");

                if (channel_create.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
                if (channel_create.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

                await r.table("logs").insert({ id: interaction.guild.id, channelCreateLog: channel_create.id }).run(client.con)
                await r.table("logs").get(interaction.guild.id).update({ channelCreateLog: channel_create.id }).run(client.con)

            const channelcreateEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`channel_create\``)
                .addField(`New value`, `<#${channel_create.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [channelcreateEmbed] })

            // channelDeleteLog
            let channel_delete = interaction.options.getChannel("channel_delete");

            if (channel_delete.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (channel_delete.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, channelDeleteLog: channel_delete.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ channelDeleteLog: channel_delete.id }).run(client.con)

            const channeldeleteEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`channel_create\``)
                .addField(`New value`, `<#${channel_delete.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [channeldeleteEmbed] })

            // channelUpdateLog
            let channel_update = interaction.options.getChannel("channel_update");

            if (channel_update.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (channel_update.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, channelUpdateLog: channel_update.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ channelUpdateLog: channel_update.id }).run(client.con)

            const channelupdateEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`channel_update\``)
                .addField(`New value`, `<#${channel_update.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [channelupdateEmbed] })

            // emojiCreateLog
            let emoji_create = interaction.options.getChannel("emoji_create");

            if (emoji_create.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (emoji_create.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, emojiCreateLog: emoji_create.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ emojiCreateLog: emoji_create.id }).run(client.con)

            const emojicreateEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`emoji_create\``)
                .addField(`New value`, `<#${emoji_create.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [emojicreateEmbed] })

            // emojiUpdateLog
            let emoji_update = interaction.options.getChannel("emoji_update");

            if (emoji_update.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (emoji_update.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, emojiUpdateLog: emoji_update.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ emojiUpdateLog: emoji_update.id }).run(client.con)

            const emojiupdateEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`emoji_update\``)
                .addField(`New value`, `<#${emoji_update.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [emojiupdateEmbed] })

            // emojiDeleteLog
            let emoji_delete = interaction.options.getChannel("emoji_delete");

            if (emoji_delete.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (emoji_delete.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, emojiDeleteLog: emoji_delete.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ emojiDeleteLog: emoji_delete.id }).run(client.con)

            const emojideleteEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`emoji_delete\``)
                .addField(`New value`, `<#${emoji_delete.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [emojideleteEmbed] })

            // roleCreateLog
            let role_create = interaction.options.getChannel("role_create");

            if (role_create.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (role_create.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, roleCreateLog: role_create.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ roleCreateLog: role_create.id }).run(client.con)

            const rolecreateEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`role_create\``)
                .addField(`New value`, `<#${role_create.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [rolecreateEmbed] })

            // roleDeleteLog
            let role_delete = interaction.options.getChannel("role_delete");

            if (role_delete.type === "GUILD_CATEGORY") return interaction.reply({content: "\`Specify a text channel.\`"});
            if (role_delete.type === "GUILD_VOICE") return interaction.reply({content: "\`Specify a text channel.\`"});

            await r.table("logs").insert({ id: interaction.guild.id, roleDeleteLog: role_delete.id }).run(client.con)
            await r.table("logs").get(interaction.guild.id).update({ roleDeleteLog: role_delete.id }).run(client.con)

            const roledeleteEmbed = new MessageEmbed()
                .setTitle(client.strings.tools.set.embed_successfully)
                .setDescription(`${client.strings.tools.set.embed_selected} \`role_delete\``)
                .addField(`New value`, `<#${role_create.id}>`)
                .setColor("DARK_BUT_NOT_BLACK")
            await interaction.channel.send({ embeds: [roledeleteEmbed] })
        }
        },
};