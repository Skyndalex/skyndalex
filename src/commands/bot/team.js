module.exports = {
    name: "team",
    description: "Bot owners and admins.",

    run: async (client, interaction) => {

        //TODO: users list from Discord role. || Now from strings!
        let owners;
        let admins;
        let mods;

        client.strings.bot.team.owners.array.forEach(element => {
            owners.concat(`[${client.users.cache.get(element).user.tag}](https://discord.com/users/${element})`)
        }),
        
        client.strings.bot.team.admins.array.forEach(element => {
            admins.concat(`[${client.users.cache.get(element).user.tag}](https://discord.com/users/${element})`)
        }),

        client.strings.bot.team.mods.array.forEach(element => {
            mods.concat(`[${client.users.cache.get(element).user.tag}](https://discord.com/users/${element})`)
        }),

        client.builder(interaction, `Our Team`, `Contact us if you need help\n**Protip**: Click on the tag to open DM `, ``, `GREEN`, [
            { name: "Owners", value: owners },
            { name: "Admins", value: admins },
            { name: "Moderators", value: mods }
        ])
    }
}
