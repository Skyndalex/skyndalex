const WebSocket = require("ws");
const discord = require("./discord.js");
const { token, prefix , gban } = require("../config.json");

const client = new Object();
const events = new Object();
const commands = new Object();

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
    let data;

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

        if (msg.op === 10) {
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
                        "$os": "TempleOS",
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
                            
                            if (gban.includes(data.author.id)) return events.error(client, "gbna", data);

                            if (commands[command]) {
                                commands[command].function(client, data);
                            } else {
                                Object.values(commands).find(x => x.aliases.includes(command)).function(client, data);
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

    ws.on("close", (code, reason) => {
        client.guilds = [];
        console.log(`CLOSED - ${code} - ${reason}`);
        setTimeout(require("./gateway.js").run, 10000);
    })
}
