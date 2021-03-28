module.exports = (client, message) => {
    let statuses = ["@Krive", "krivebot.tk/discord", "krivebot.tk/invite", "krivebot.tk/donate"]
setInterval(() => client.user.setActivity(`${statuses.random()}`, {type: "WATCHING"}), 10000)
}