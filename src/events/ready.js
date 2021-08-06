module.exports = (client) => {
    let statuses = [`${client.version}`, `Dodaj mnie już teraz → ${client.url}/invite`, `Dołącz na serwer support! → ${client.url}/discord`, `Nowa strona internetowa! → ${client.url}`, `Dokumentacja → ${client.docsLink}`, `Status → ${client.statusLink}`]
    setInterval(() => client.user.setPresence({ activities: [{ name: statuses.random()}] }));
}