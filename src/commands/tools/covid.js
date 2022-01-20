const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "covid",
    description: "covid.",
    options: [
        { name: "vaccinations", description: "Total vaccinations stats in Poland", type: 1 },
        { name: "general", description: "General stats in Poland.", type: 1 }
    ],
    run: async (client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case "vaccinations":
                fetch('https://services-eu1.arcgis.com/zk7YlClTgerl62BY/arcgis/rest/services/global_szczepienia_actual_widok/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=1&resultType=standard&cacheHint=true')
                    .then(res => res.json())
                    .then(async json => {
                        for (let i in json.features) {
                            const embed = new MessageEmbed()
                                .setTitle(`Covid stats`)
                                .setDescription(`Covid stats in \`Poland\``)
                                .addField(`Total vaccinations`, `${json.features[i].attributes.SZCZEPIENIA_SUMA}`, true)
                                .addField(`Daily vaccinations`, `${json.features[i].attributes.SZCZEPIENIA_DZIENNIE}`, true)
                                .addField(`Sum of vaccinations with 2nd dose`, `${json.features[i].attributes.DAWKA_2_SUMA}`, true)
                                .addField(`Daily 2-dose vaccination`, `${json.features[i].attributes.DAWKA_2_DZIENNIE}`, true)
                                .addField(`Adverse Reactions`, `${json.features[i].attributes.ODCZYNY_NIEPOZADANE}`, true)
                                .addField(`Lost doses`, `${json.features[i].attributes.DAWKI_UTRACONE}`, true)
                                .addField(`Number of women vaccinated`, `${json.features[i].attributes.SZCZEPIENIA_KOBIETY}`, true)
                                .addField(`Number of man vaccindated`, `${json.features[i].attributes.SZCZEPIENIA_MEZCZYZNI}`, true)
                                .addField(`Vaccindated in stock`, `${json.features[i].attributes.STAN_MAGAZYN}`, true)
                                .addField(`Number of orders in process`, `${json.features[i].attributes.zamowienia_realizacja}`, true)
                                .setColor("DARK_BUT_NOT_BLACK")
                            await interaction.reply({embeds: [embed]})
                        };
                    });
                break;
            case "general":
                fetch("https://services-eu1.arcgis.com/zk7YlClTgerl62BY/arcgis/rest/services/global_corona_actual_widok3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=1&resultType=standard&cacheHint=true")
                    .then(res => res.json())
                    .then(async json => {
                        for (let i in json.features) {
                            const embed = new MessageEmbed()
                                .setTitle(`Covid stats`)
                                .setDescription(`Covid stats in \`Poland\`\n\n**Infections:** ${json.features[i].attributes.LICZBA_ZAKAZEN}\n**Deaths:** ${json.features[i].attributes.LICZBA_ZGONOW}`)
                                .addField(`Daily infections`, `${json.features[i].attributes.ZAKAZENIA_DZIENNE}`, true)
                                .addField(`Daily deaths`, `${json.features[i].attributes.ZGONY_DZIENNE}`, true)
                                .addField(`COVID Deaths`, `${json.features[i].attributes.ZGONY_COVID}`, true)
                                .addField(`Quarantine`, `${json.features[i].attributes.KWARANTANNA}`, true)
                                .addField(`Tests`, `${json.features[i].attributes.TESTY}`, true)
                                .addField(`Positive tests`, `${json.features[i].attributes.TESTY_POZYTYWNE}`, true)
                                .addField(`Healers`, `${json.features[i].attributes.LICZBA_OZDROWIENCOW}`, true)
                                .addField(`Actually infections`, `${json.features[i].attributes.AKTUALNE_ZAKAZENIA}`, true)
                                .addField(`All healers`, `${json.features[i].attributes.WSZYSCY_OZDROWIENCY}`, true)
                                .setColor("DARK_BUT_NOT_BLACK")
                            await interaction.reply({embeds: [embed]})
                        };
                    });
                break;
        }
    }
};