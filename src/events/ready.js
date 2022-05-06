const fs = require("fs");
module.exports = (client, interaction) => {
    client.user.setPresence({
        activities: [{name: 'HACKED BY MATSTEF'}],
    });

    console.log(pc.green(`${pc.yellow('[DISCORD CLIENT]')} Ready`));

    client.users.cache.get("682572949219180547").send("<#971867654166032444>")
};
