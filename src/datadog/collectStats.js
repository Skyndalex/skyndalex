const metrics = require("datadog-metrics");
const { dgToken, host } = require("../config.json").datadog
exports.run = async (client, interaction) => {
   await metrics.init({ host: 'noskyndalex', prefix: 'skyndalex.', apiKey: dgToken});

   async function collectStats() {
        metrics.gauge('guilds.count', client.guilds.cache.size);
        metrics.gauge('channels.count', client.channels.cache.size);
        metrics.gauge('users.count', client.users.cache.size);
        metrics.gauge('emojis.count', client.emojis.cache.size);
        metrics.gauge('interactions', interaction)
    };

    console.log(pc.green(`${pc.blue("[DATADOG]")} Successfully pushed metrics to DataDog dashboard.`))

    setInterval(collectStats, 5000);
}