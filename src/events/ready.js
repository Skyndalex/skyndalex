const fs = require("fs");
const axios = require("axios");
const { dgToken } = require("../config.json")
let metrics = require("datadog-metrics")
const { dbStats } = require("../utils/modals");
module.exports = async (client) => {
    client.user.setPresence({
        activities: [{name: '[⚠️] Global commands are disabled!\nBot testing available only on support: https://discord.gg/RkUYDx5bhM'}],
    });

    console.log(pc.green(`${pc.yellow('[DISCORD CLIENT]')} Ready`));

};
