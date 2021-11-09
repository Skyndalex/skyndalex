const axios = require("axios");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "kaczkoland",
    description: "Kaczkoland.PL Minecraft server stats.",
    options: [
        { type: "STRING", name: "player", description: "Player name", required: true}
    ],

    run: async (client, interaction) => {
         await interaction.reply({content: "Sorry, this command is disabled until the new Kaczkoland.PL API\n*But you can see your stats on their site: [Stats](<https://kaczkoland.pl/statystyki>)*"});
    }
}