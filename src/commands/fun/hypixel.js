const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
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
        const uuid = await axios(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString("player")}`);
        const { data } = await axios(`https://api.hypixel.net/player?uuid=${uuid.data.id}&key=${process.env.HYPIXEL_API_KEY}`);

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
                            .setDescription(`Podany tryb: \`TNT Games\`\n\nLiczba wygranych w TNT WIZARDS: ${tntgames_wizards_wins || 0}\nLiczba zabitych graczy w TNT WIZARDS: ${tntgames_tnt_wizards_kills || 0}\nLiczba zabitych graczy w PVP RUN: ${tntgames_tnt_run_wins || 0}\nLiczba wygranych w PVP RUN: ${tntgames_pvp_run_wins || 0}\nLiczba wygranych w TNT TAG: ${tntgames_tnt_tag_wins || 0}\nLiczba wygranych w TNT RUN: ${tntgames_tnt_run_wins || 0}\nLiczba wygranych w BOF SPLEEF: ${tntgames_bow_spleef_wins || 0}\nŁączna liczba przebytych bloków w TNT RUN: ${tntgames_block_runner || 0}\nRekord w TNT RUN: ${record_tntrun || 0}\nŚmierci w TNT RUN: ${deaths_tntrun || 0}\nBanker: ${tntgames_tnt_banker || 0}\nClinic: ${tntgames_clinic || 0}`)
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
                    case "hypixel_vampirez":
                        const vampirezStats = data.player.achievements;
                        const { vampirez_zombie_killer } = vampirezStats;

                        const hypixelVampireZEmbed = new MessageEmbed()
                            .setDescription(`Podany tryb: \`VampireZ\`\n\nLiczba zabitych zombie: ${vampirez_zombie_killer}`)
                            .setColor("BLUE")
                        await i.update({embeds: [hypixelVampireZEmbed]})
                        break;
                    case "hypixel_bedwars":
                        const bedwarsStats = data.player.achievements;
                        const { bedwars_wins, bedwars_level, bedwars_beds, bedwars_loot_box, bedwars_bedwars_killer } = bedwarsStats;

                        const hypixelBedwarsEmbed = new MessageEmbed()
                            .setDescription(`Podany tryb: \`BedWars\`\n\nLiczba wygranych: ${bedwars_wins}\nPoziom: ${bedwars_level}\nZniszczone łóżka: ${bedwars_beds}\nLootboxy: ${bedwars_loot_box}\nZabitych graczy: ${bedwars_bedwars_killer}`)
                            .setColor("BLUE")
                        await i.update({embeds: [hypixelBedwarsEmbed]})
                        break;
                }
            }
        })
    }
};