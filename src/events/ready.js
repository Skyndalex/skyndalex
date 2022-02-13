module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        await client.user.setPresence({ activities: [{ name: "Gotowy do działania!" }] });
        console.log("Bot ready.")
    }
}