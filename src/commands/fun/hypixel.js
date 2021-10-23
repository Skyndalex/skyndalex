const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const axios = require("axios");
const { hypixelkey } = require("../commandKeys/keys.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hypixel')
        .setDescription('sprawdza statystyki gracza na serwerze hypixel')
        .addStringOption(option => (
            option.setName("player").setDescription("Gracz").setRequired(true)
        )),

    async execute(client, interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('hypixel-player-select-menu')
                    .setPlaceholder(`Tryb`)
                    .addOptions([
                        {label: 'Walls', description: 'Ściany', value: 'hypixel_walls'},
                        {label: "Paintball", description: "Paintball", value: "hypixel_paintball"},
                        {label: "Survival Games", description: "Gry survival", value: "hypixel_survivalgames"},
                        {label: "TNT Games", description: "Gry TNT", value: "hypixel_tntgames"},
                        {label: "VampireZ", description: "Vampirez", value: "hypixel_vampirez"},
                        {label: "Walls3", description: "Mega walls", value: "hypixel_megawalls"},
                        {label: "Arcade", description: "Arcade", value: "hypixel_arcade"},
                        {label: "Arena", description: "Arena", value: "hypixel_arena"},
                        {label: "UHC", description: "uhc", value: "hypixel_uhc"},
                        {label: "Housing", description: "Housing", value: "hypixel_housing"},
                        {label: "Skywars", description: "Skywars", value: "hypixel_skywars"},
                        {label: "Bedwars", description: "Bedwars", value: "hypixel_bedwars"},
                        {label: "Murder_Mystrey", description: "Murder Mystrey", value: "hypixel_murdermystrey"},
                        {label: "Build_Battle", description: "Build Battle", value: "hypixel_buildbatle"}
                    ]),
            );

        interaction.reply({content: `Podany gracz: \`${interaction.options.getString("player")}\`\nJeśli wybór opcji nie działa, należy wpisać komendę ponownie. Jest to cooldown.`, components: [row]});

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: 'SELECT_MENU',
            time: 120000
        });

        const uuid = await axios(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString("player")}`);
        const { data } = await axios(`https://api.hypixel.net/player?uuid=${uuid.data.id}&key=${hypixelkey}`);

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                switch (i.values[0]) {
                    case "hypixel_walls":
                        const wallsStats = data.player.achievements
                        const { walls_coins, walls_wins } = wallsStats;

                        const wallsEmbed = new MessageEmbed()
                            .setDescription(`Podany tryb: \`Walls (ściany)\`\n\nLiczba monet: ${walls_coins}\nLiczba wygranych: ${walls_wins}`)
                            .setColor("BLUE")
                        i.update({embeds: [wallsEmbed]})
                    break;
                }
            }
        })
    }
};