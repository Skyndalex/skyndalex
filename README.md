# Nowa wersja, v4.4

## Uwagi
- Przez globalne komendy komendy mogą się ładować wolniej. Jeżeli testujesz bota tylko na jednym serwerze, usuń tą część kodu z pliku ready.js (w kategorii: events)

[Zobacz plik](https://github.com/Korrumz2PL/krivebot/blob/slash/events/ready.js)
```js
await rest.put(
    Routes.applicationCommands(clientId),
    { body: commands },
);
```

### Wartości

1. `clientId` = ID bota
2. `guildId` = ID serwera
## Puste pliki
- Puste pliki będą oznaczone tekstem "TODO:" albo "todo:". Ułatwi to właścicielowi pisanie bota.
# Włączanie bazy danych

- Windows:
1. Przejdź do katalogu: `cd rethinkdb-2.3.6`
- Włącz: `./rethinkdb`
# Włączanie bota
## deploy.js
- Na początku należy włączyć plik `deploy.js`. On zaktualizuje slash komendy na twoim serwerze bądź globalnie. Przy każdej zmianie komend należy włączyć ten plik aby na spokojnie mogło się zaktualizować.
## slash.js
- Włącz ten plik, aby uruchomić bota, bazę danych oraz stronę.

# Przydatne linki oraz poradniki

Oficjalna strona: [discordjs.guide](https://discordjs.guide).

- [Discord.Js Documentation (Main)](https://discord.js.org/#/docs/main/main/general/welcome),
- [Discord.Js v13 (NPM)](https://www.npmjs.com/package/discord.js),
- [Node.Js](https://nodejs.org),
- [Discord.Js Guide #Reactions](https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages),
- [Discord.Js Guide #Creating-Slash-Commands](https://discordjs.guide/creating-your-bot/creating-commands.html#replying-to-commands),
- [Discord.Js Guide #Event-Handling](https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files),
- [Discord.Js Guide #Buttons](https://discordjs.guide/interactions/buttons.html),
- [Discord.Js Guide #Select-Menus](https://discordjs.guide/interactions/select-menus.html#component-collectors)
Nie zalecamy uruchamiać kodu bez żadnej znajomości javascriptu