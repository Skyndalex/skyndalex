const { fetch } = require("undici");

module.exports = async (client, interaction) => {
    const db = await r.table("trello").get(interaction.user.id).run(client.con);

    const res = await fetch(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${db.key}&token=${db.token}`)

    const json = await res.json()

    let x = []
    for (let i in json) {
        x.push(`${json[i].name} ::: ${json[i].id}`)
    }
    await interaction.reply(`\`\`\`${x.join(",\n")}\`\`\``)
}