const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const { hypixelkey } = require("../commandKeys/keys.json")
const axios = require("axios");
const dayjs = require("dayjs")
dayjs.locale("pl")
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
                        {label: "paintball", description: "Paintball", value: "hypixel_paintball"},
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
                        {label: "Build_Battle", description: "Build Battle", value: "hypixel_buildbatle"},
                        {label: "Generalne informacje", description: "Generalne informacje o graczu na serwerze hypixel.net", value: "hypixel_general"}
                    ]),
            );

        interaction.reply({content: `Podany gracz: \`${interaction.options.getString("player")}\`\nJeśli wybór opcji nie działa, należy wpisać komendę ponownie. Jest to cooldown.\n**Uwaga!** Statystyki mogą nie być w 100% poprawne.`, components: [row]});

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
                        await i.update({embeds: [wallsEmbed]})
                        break;
                    case "hypixel_paintball":
                        const paintballStats = data.player.achievements;
                        const { paintball_kills, paintball_wins } = paintballStats;

                        const paintballEmbed = new MessageEmbed()
                            .setDescription(`Podany tryb: \`Paintball\`\n\nLiczba zabitych graczy: ${paintball_kills}\nLiczba wygranych: ${paintball_wins}`)
                            .setColor("BLUE")
                        await i.update({embeds: [paintballEmbed]})
                        break;
                    case "hypixel_tntgames":
                        const tntgamesStats = data.player.achievements;
                        const { tntgames_wizards_wins, tntgames_pvp_run_killer, tntgames_tnt_tag_wins, tntgames_pvp_run_wins, tntgames_tnt_wizards_kills, tntgames_tnt_run_wins, tntgames_bow_spleef_wins, tntgames_tnt_triathlon, tntgames_tnt_banker, tntgames_block_runner, tntgames_clinic } = tntgamesStats;

                        const otherStats = data.player.stats.TNTGames;
                        const { record_tntrun, deaths_tntrun } = otherStats;

                        const tntgamesEmbed = new MessageEmbed()
                            .setDescription(`Podany tryb: \`TNT Games\`\n\nLiczba wygranych w TNT WIZARDS: ${tntgames_wizards_wins}\nLiczba zabitych graczy w TNT WIZARDS: ${tntgames_tnt_wizards_kills}\nLiczba zabitych graczy w PVP RUN: ${tntgames_tnt_run_wins}\nLiczba wygranych w PVP RUN: ${tntgames_pvp_run_wins}\nLiczba wygranych w TNT TAG: ${tntgames_tnt_tag_wins}\nLiczba wygranych w TNT RUN: ${tntgames_tnt_run_wins}\nLiczba wygranych w BOF SPLEEF: ${tntgames_bow_spleef_wins}\nŁączna liczba przebytych bloków w TNT RUN: ${tntgames_block_runner}\nRekord w TNT RUN: ${record_tntrun}\nŚmierci w TNT RUN: ${deaths_tntrun}\nBanker: ${tntgames_tnt_banker}\nClinic: ${tntgames_clinic}`)
                            .setColor("BLUE")
                        await i.update({embeds: [tntgamesEmbed]})
                        break;
                    case "hypixel_general":
                        const generalStats = data.player;
                        const { firstLogin, playername, lastLogin } = generalStats;

                        let s1 = new Date(firstLogin / 1000).getTime();
                        let s2 = new Date(lastLogin / 1000).getTime();

                        const hypixelGeneralEmbed = new MessageEmbed()
                            .setDescription(`Statystyki generalne\n\nNazwa znalezionego gracza: ${data.player.playername}\nPierwsze logowanie: <t:${s1}:R>\nOstatnie logowanie: <t:${s2}:R>`)
                            .setColor("BLUE")
                        await i.update({embeds: [hypixelGeneralEmbed]})
                        break;
                }
            }
        })
    }
};