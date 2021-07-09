const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.suggestionsetting\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")

     switch (args[0]) {
         default:
             client.sender(message, "Menu konfiguracji sugestii", "Cześć, wybierz tryby oraz ustaw kanały te, które chcesz!", "", "GREEN", [
                 {
                     name: "Klasyczne",
                     value: "\`sgconfig channel [kanał]\`\n → Klasyczne sugestie, wystarczy ustawić kanał"
                 },
                 {
                     name: "Mniej zaawansowane",
                     value: "\`sgconfig advancedmini [kanał]\`\n → Mniej zaawansowane sugestie: Bot nie zamieni wiadomości użytkownika w embed, będzie TYLKO dodawał reakcje do wiadomości na __ustawionym__ kanale."
                 },
                 {
                     name: "Zaawansowane",
                     value: "\`sgconfig advanced [kanał]\`\n → Zaawansowane sugestie: Bot zamieni wiadomość użytkownika w embed z treścią sugestii, a następnie doda reakcje"
                 },
                 {
                     name: "Obrazkowe",
                     value: "\`sgconfig media [kanał]\`\n → Sugestie obrazkowe - czyli bot usuwa każdą wiadomość oprócz obrazków/filmików, po wysłaniu obrazka bot doda reakcje - można to wykorzystać np. do sugestii emoji"
                 },
                 {
                     name: "UWAGA!",
                     value: "Sugestie, jak i inne ustawienia trzeba również włączyć. Użyj komendy \`activate [classic/advancedmini/advanced/media\`."
                 }
             ])
             break;
             case 'channel':
                const classicSuggestEnable = await r.table("settings").get(message.guild.id).run(client.con)
                if (!classicSuggestEnable?.classicSuggestActivate) return message.channel.send("Kanały klasycznych propozycji są wyłączone! Proszę je włączyć komendą \`activate\`.")

                let sChannel = message.guild.channels.cache.find( c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                if (!sChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")    
                 
                const update1 = await r.table("settings").get(message.guild.id).update({suggestClassicChannel: sChannel.id}).run(client.con)

                client.sender(message, `Ustawiono!`, `Pomyślnie ustawiłem kanał\nTyp: Klasyczne\nKanał: <#${sChannel.id}>\nPrzez: ${message.author.tag}`, ``, `GREEN`, ``, ``)
                break;
                case 'advancedmini':
                    const advancedMiniActivate = await r.table("settings").get(message.guild.id).run(client.con)
                    if (!advancedMiniActivate?.advancedminiSuggestActivate) return message.channel.send("Kanały mniej zaawansowanych propozycji są wyłączone! Proszę je włączyć komendą \`activate\`.")
    
                    let sChannel2 = message.guild.channels.cache.find( c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
                    if (!sChannel2) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")    
                     
                    const update2 = await r.table("settings").get(message.guild.id).update({advancedminiSuggestChannel: sChannel2.id}).run(client.con)
    
                    client.sender(message, `Ustawiono!`, `Pomyślnie ustawiłem kanał\nTyp: Mniej zaawansowane\nKanał: <#${sChannel2.id}>\nPrzez: ${message.author.tag}`, ``, `GREEN`, ``, ``)
                    break;
     }
};

exports.help = {
    name: "sgconfig",
    description: "Konfiguracja sugestii",
    category: "tools",
    aliases: ["suggestconfig"]
}