const fs = require("fs");
module.exports = (client, interaction) => {
    client.user.setPresence({
        activities: [{name: 'HACKED BY POLIGON'}],
    });

    const interactionFiles = fs.readdirSync('./interactions');

    for (const folder of interactionFiles) {
        const interactionFiles = fs.readdirSync(`./interactions/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const module = require(`../interactions/${folder}/${file}`);
            module.run(client, interaction)
        }
    }
    console.log(pc.green(`${pc.yellow('[DISCORD CLIENT]')} Ready`));
};
