# Włączanie bota

```
cd src
node slash.js
```
## Dodawanie slash komend

```
cd src
node deploy.js
```
## Wyłączanie globalnych slash-komend
1. Przejdź do pliku `src/deploy.js`
2. usuń tą część kodu:
```js
Routes.applicationCommands(clientId),
{ body: commands },
);
```
# Przydatne linki oraz poradniki

- [Discord.Js Documentation (Main)](https://discord.js.org/#/docs/main/main/general/welcome),
- [Discord.Js v13 (NPM)](https://www.npmjs.com/package/discord.js),
- [Node.Js](https://nodejs.org),
- [Discord.Js Guide #Reactions](https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages),
- [Discord.Js Guide #Creating-Slash-Commands](https://discordjs.guide/creating-your-bot/creating-commands.html#replying-to-commands),
- [Discord.Js Guide #Event-Handling](https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files),
- [Discord.Js Guide #Buttons](https://discordjs.guide/interactions/buttons.html),
- [Discord.Js Guide #Select-Menus](https://discordjs.guide/interactions/select-menus.html#component-collectors)

Nie zalecamy uruchamiać kodu bez żadnej znajomości javascriptu