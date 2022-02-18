module.exports = client => {
        client.user.setPresence({ activities: [{ name: "Testy na produkcji, egzekucja serwerów za 2137m" }] });
        console.log("[CLIENT] Ready.")
}