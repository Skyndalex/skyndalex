module.exports = {
    name: "team",
    description: "Bot owners and admins.",

    run: async (client, interaction) => {

        //TODO: users list from Discord role.

        client.builder(interaction, `Our Team`, `Contact us if you need help\n**Protip**: Click on the tag to open DM `, ``, `GREEN`, [
            { name: "Owners", value: "[\`entity#8235\`](https://discord.com/users/817883855310684180)"},
            { name: "Admins", value: "[\`Cyber#4993\`](https://discord.com/users/682572949219180547)\n[\`MatStef132#0069\`](https://discord.com/users/304979757852917762)"},
            { name: "Moderators", value: "[\`igreky#7567\`](https://discord.com/users/802148822989275197)\n[\`Minecrafter!#9481\`](https://discord.com/users/484419302200442890)\n[\`crash#3067\`](https://discord.com/users/308322131962494977)\n[\`puszek#2684\`](https://discord.com/users/842845575698186261)"}
        ])
    }
}