module.exports = async(client) => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `Zapraszamy na serwer support`,
            type: 'PLAYING',
        }
    })
}