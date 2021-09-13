# Nowa wersja, v4.4

## Uwagi
- Przez globalne komendy komendy mogą się ładować wolniej. Jeżeli testujesz bota tylko na jednym serwerze, usuń tą część kodu z pliku Ready.js (w kategorii: events)

```js
await rest.put(
    Routes.applicationCommands(clientId),
    { body: commands },
);
```

### Wartości

1. clientId = ID bota
2. guildId = ID serwera