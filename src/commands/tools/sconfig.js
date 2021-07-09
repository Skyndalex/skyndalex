exports.run = (client, message, args) => {
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
                     value: "Sugestie, jak i inne ustawienia trzeba również włączyć. Użyj komendy \`sgconfig enable\`."
                 }
             ])
             break;
             case 'enable':
                 break;
     }
};

exports.help = {
    name: "sgconfig",
    description: "Konfiguracja sugestii",
    category: "tools",
    aliases: ["suggestconfig"]
}