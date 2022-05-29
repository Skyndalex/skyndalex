const metrics = require("datadog-metrics");
const { dgToken } = require("../../config.json").datadog
exports.run = (client) => {
    metrics.init({ host: 'noskyndalex', prefix: 'skyndalex.', apiKey: dgToken});

    function collectMemoryStats() {
        metrics.gauge('guilds.count', client.guilds.cache.size);
        metrics.gauge('channels.count', client.channels.cache.size);
        metrics.gauge('users.count', client.users.cache.size);
        metrics.gauge('emojis.count', client.emojis.cache.size);
    };

    console.log(pc.green(`${pc.yellow("[DATADOG]")} Successfully pushed bot statistics to DataDog dashboard.`))

    setInterval(collectMemoryStats, 5000);
}