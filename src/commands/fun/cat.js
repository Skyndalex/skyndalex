const axios = require("axios");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "cat",
    description: "Random cat",

    run: async (client, interaction) => {
        await axios.get("https://some-random-api.ml/img/cat").then(async function (response) {

            interaction.deferReply();
            await wait(1000)
            interaction.editReply({files: [response.data.link]})
        });
    }
}