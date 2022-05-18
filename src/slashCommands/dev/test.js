const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message, MessageActionRow, MessageButton, Modal, MessageSelectMenu} = require("discord.js")
const { showModal } = require("../../utils/modals");
const {JSON} = require("@datadog/datadog-api-client/dist/packages/datadog-api-client-v1/models/WebhooksIntegrationEncoding");
require("dotenv").config()
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