module.exports = {
    name: "ready",
    once: false,

    execute(client) {
        client.user.setPresence({
            status: 'online',
            activity: {
                name: `Zapraszamy na serwer support`,
                type: 'PLAYING',
            }
        })
        console.log('Client ready')
    }
}