exports.run = (client, message) => {

    let guild = client.guilds.cache.get("804477558061137972")

    const owners = guild.roles.cache.find(role => role.id === '804713517596540958').members.map(m=>m.user.tag).join(" || ");
    const headadmins = guild.roles.cache.find(role => role.id === '841068015045967892').members.map(m=>m.user.tag).join(" || ");
    const moderators = guild.roles.cache.find(role => role.id === '841068357385977876').members.map(m=>m.user.tag).join(" || ");
    const friends = guild.roles.cache.find(role => role.id === '844642293910863973').members.map(m=>m.user.tag).join(" || ");
    const testers = guild.roles.cache.find(role => role.id === '851931521875312671').members.map(m=>m.user.tag).join(" || ");
    const specials = guild.roles.cache.find(role => role.id === '860231659009081345').members.map(m=>m.user.tag).join(" || ")||"BRAK";

    client.sender(message, "Ekipa bota", "Lista osób zajmujących się botem. Lub po prostu zaufani ludzie. Bądź zwykli testerzy", "", "GREEN", [
        {
            name: "Programiści bota",
            value: `> → \`${owners}\``
        },
        {
            name: "Headadmini",
            value: `> → \`${headadmins}\``
        },
        {
            name: "Moderatorzy",
            value: `> → \`${moderators}\``
        },
        {
            name: "Przyjaciele",
            value: `> → \`${friends}\``
        },
        {
            name: "Testerzy",
            value: `> → \`${testers}\``
        },
        {
            name: "Specjalne",
            value: `> → \`${specials}\``
        }
    ])
};

exports.help = {
    name: "staffs",
    description: "Ekipa bota",
    category: "bot",
    aliases: ["ekipa"]
}