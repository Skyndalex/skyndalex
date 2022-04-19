module.exports = (client) => {
    client.user.setPresence({
        activities: [{name: 'HACKED BY POLIGON [porno: /porno]'}],
    });
    console.log(pc.green(`${pc.yellow('[DISCORD CLIENT]')} Ready`));
    console.log(pc.bold(pc.green(`${pc.yellow("[NOTIFICATION]")} Have there been errors? Use the ${pc.bgRed("node deploy.js")} command to check for errors in the console.`)))
};
