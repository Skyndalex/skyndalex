module.exports = {
    name: "ready",
    once: false,

    execute(client) { 
        const randomStat = [`Domena strony: ${client.site}`, `Dodaj bota! -> ${client.invite}`, `Wejdź na nasz serwer wsparcia! -> ${client.discord}`]
        client.user.setPresence({ activities: [{ name: randomStat.random() }] });
        console.log('Client ready')
    }
}