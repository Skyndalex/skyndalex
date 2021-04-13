module.exports = (client) => {
    let statuses = [`@${client.botname}`, `${client.botname} ${client.latestupdate}`, `${client.url}/discord`, `${client.url}/public`, `${client.url}/donate`, `${client.url}/invite`]
    setInterval(() => client.user.setActivity(statuses.random(), {type: "LISTENING"}), 10000)
}