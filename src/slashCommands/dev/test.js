const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command")
        .setDefaultPermission(false),

            async execute(client, interaction) {
                const { v1 } = require("@datadog/datadog-api-client");

                const configuration = v1.createConfiguration();
                const apiInstance = new v1.MetricsApi(configuration);

                const params = {
                    metricName: "rethinkdb.config.tables_per_database",
                };

                apiInstance.getMetricMetadata(params).then(async data => {
                    console.log(data)
                }).catch(console.error);
    }
}