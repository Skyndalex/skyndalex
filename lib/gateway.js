const WebSocket = require("ws");
const discord = require("./discord.js");
const { token } = require("../config.json");

const client = new Object();
const events = new Object();
const commands = new Object();
const cooldown = new Set();

exports.event = (name, func) => {
    events[name] = func;
}

exports.command = (category, name, description, usage, aliases, func) => {
    commands[name] = {};
    commands[name]["description"] = description;
    commands[name]["usage"] = usage;
    commands[name]["function"] = func;
    commands[name]["category"] = category;
    commands[name]["aliases"] = aliases;
}

exports.registerModules = (gateway, discord, modules) => {
    for (_module in modules) {
        require(`../${modules[_module]}.js`).load(gateway, discord);
    }
}

exports.run = () => {
    const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
    client.uptime = Date.now();
    var data;

    function heartbeat() {
        setInterval(() => {
            data = {
                op: 1,
                d: 251
            }

            ws.send(JSON.stringify(data));
        }, 41250)
    }

    ws.on("message", function(msg) {
        msg = JSON.parse(msg);

        if (msg.op == 10) {
            data = {
                op: 1,
                d: 251
            }

            ws.send(JSON.stringify(data));

            data = {
                op: 2,
                d: {
                    token: `Bot ${token}`,
                    intents: 32511,
                    properties: {
                        "$os": "linux",
                        "$browser": "skyndalexlib",
                        "$device": "skyndalexlib"
                    }
                }
            }

            ws.send(JSON.stringify(data));
            heartbeat();
            client.ws = ws;

            if (events.hasOwnProperty("ready")) events.ready(client);
        }

        if (!client.hasOwnProperty("guilds")) client.guilds = [];

        switch (msg.t) {
            case "MESSAGE_CREATE":
                const prefix = "s/";
                data = msg.d

                if (data.author.hasOwnProperty("bot")) return;

                if (data.content.startsWith(prefix)) {
                    const command = data.content.split(" ")[0].slice(prefix.length);
                    
                    if (commands.hasOwnProperty(command) || (Object.values(commands).find(x => x.aliases.includes(command)) && Object.values(commands).find(x => x.aliases.includes(command)).aliases.includes(command))) {
                        try {
                            client.commands = commands;
                            client.events = events;
                            client.command = commands[command] || Object.values(commands).find(x => x.aliases.includes(command));
                            client.args = data.content.split(" ").slice(1)

                            const owners = ["509014773006991376", "636096693712060416"];
                            
                            if (cooldown.has(data.author.id) && !owners.includes(data.author.id)) {
                                if (events.hasOwnProperty("error")) events.error(client, "cooldown", data);
                            } else {
                                if (commands[command]) {
                                    commands[command].function(client, data);
                                } else {
                                    Object.values(commands).find(x => x.aliases.includes(command)).function(client, data);
                                }
                                cooldown.add(data.author.id);
                                setTimeout(() => cooldown.delete(data.author.id), 3000);
                            }
                        } catch(e) {
                            console.log(e);
                        }
                    } else {
                        if (events.hasOwnProperty("error")) events.error(client, "commandnotfound", data);
                    }
                } else {
                    if (events.hasOwnProperty("MESSAGE_CREATE")) events.MESSAGE_CREATE(client, data);
                }

                break;

            case "GUILD_CREATE":
                client.guilds.push(msg.d);
                if (events.hasOwnProperty("GUILD_CREATE")) events.GUILD_CREATE(client, msg.d);
                break;

            case "GUILD_DELETE":
                if (events.hasOwnProperty("GUILD_DELETE")) events.GUILD_DELETE(client, client.guilds[msg.d.id]);
                client.guilds.slice(client.guilds.indexOf(msg.d), 1);
                break;
        }
    })

    ws.on("close", require("./gateway.js").run);
}
