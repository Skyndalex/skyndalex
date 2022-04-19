exports.run = (client, interaction) => {
    console.log(`${pc.yellow('[EMBED BUILDER:SELECT MENUS]')} ${pc.green("Enabled")}`)

    switch (interaction.customId) {
        case "embed-builder":
            console.log(interaction)
            break;
    }
}