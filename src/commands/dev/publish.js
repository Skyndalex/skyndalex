const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "publish",
    description: "Publish new bot release.",

    run: async (client, interaction) => {
        let dev = ["817883855310684180"];
        if (!dev.includes(interaction.user.id)) return message.reply(client.strings.dev.error_permissions);

        fetch("https://api.github.com/repos/Skyndalex/skyndalex/releases")
            .then(res => res.json())
            .then(async json => {
                const embed = new MessageEmbed()
                    .setTitle(`New release!`)
                    .setDescription(`${json[0].body}\n\nName: \`${json[0].name}\`\nTag: \`${json[0].tag_name}\`\nBranch: \`${json[0].target_commitish}\`\nPre-Release: \`${json[0].prerelease}\`\nURL: [\`Click\`](${json[0].html_url})`)
                    .setColor(`DARK_BUT_NOT_BLACK`)
                client.channels.cache.get("937763371133075546").send({ embeds: [embed] })

                await interaction.reply({ content: "Published.", ephemeral: true })
            });
    }
};