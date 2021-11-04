const axios = require("axios");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "say",
    description: "say a message",
    options: [
        { name: "message", description: "Message", type: "STRING", required: true}
    ],
    run: async (client, interaction) => {
       const option = interaction.options.getString("message")

        client.builder(interaction, ``, `<@${interaction.user.id}> told me to tell "\`${option}\`"`, ``, `GREEN`)
    }
}