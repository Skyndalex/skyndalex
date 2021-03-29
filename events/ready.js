module.exports = (client) => {
    let statuses = [`@Krive`, `${client.url}/discord`, `${client.url}/public`, `${client.url}/donate`, `${client.url}/invite`]
    setInterval(() => client.user.setActivity(statuses.random(), {type: "COMPETING"}), 10000)
}