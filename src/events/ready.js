module.exports = (client) => {
    let statuses = "KriveBot - front-end, innovation, professional update v4.0"
    setInterval(() => client.user.setActivity(statuses, {type: "PLAYING"}), 10000)
}