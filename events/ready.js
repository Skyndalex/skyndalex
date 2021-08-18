module.exports = {
    name: "ready",
    once: false,

    execute(client) {
        client.user.setPresence({ activities: [{ name: 'Domena strony: krivebot.xyz!' }] });
        console.log('Client ready')
    }
}