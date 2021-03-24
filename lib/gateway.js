const WebSocket = require("ws");
const discord = require("./discord.js");
const { token, defaultPrefix  } = require("../config.json");
const r = require("rethinkdb");

const client = new Object();
const events = new Object();
const commands = new Object();

exports.event = (name, func) => {
    events[name] = func;
}

exports.command = (commandObject) => {
    commands[commandObject.name] = commandObject;
}

exports.registerModules = (gateway, discord, modules) => {
    for (_module in modules) {
        require(`../modules/${modules[_module]}.js`).load(gateway, discord);
    }
}

exports.run = () => {
    const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
    let data;

    client.uptime = Date.now();
    client.bot = discord.getCurrentUser();

    if (!client.hasOwnProperty("guilds")) client.guilds = [];
    if (!client.hasOwnProperty("ping")) client.ping = {};

    r.connect({host: "localhost", port: 28015}, (err, con) => {
        if (err) console.log(err);
        client.con = con;
    })

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

        switch (msg.op) {
            case 10:
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

                if (events.hasOwnProperty("ready")) setTimeout(() => { events.ready(client) }, 1000);
                break;

            case 11:
                const now = Date.now();

                for (channel in client.ping) {
                    const ms = now - client.ping[channel];

                    discord.createMessage({channel_id: channel}, {
                        embed: {
                            description: `${ms}ms`,
                            color: 0x2ecc71
                        }
                    });
                }

                client.ping = {};

                break;
        }

        switch (msg.t) {
            case "MESSAGE_CREATE":
                data = msg.d

                const prefix = defaultPrefix

                if (data.author.hasOwnProperty("bot")) return;

                if (data.content.startsWith(prefix)) {
                    /*
                    r.db("users").table("users").filter({user_id: data.author.id}).run(client.con, (err, result) => {
                        if (result._responses[0] && result._responses[0].r[0].gban) {
                            return
                        }
                    })

                     */
                    const command = data.content.split(" ")[0].slice(prefix.length);

                    if (commands.hasOwnProperty(command) || (Object.values(commands).find(x => x.aliases.includes(command)) && Object.values(commands).find(x => x.aliases.includes(command)).aliases.includes(command))) {
                        try {
                            client.commands = commands;
                            client.events = events;
                            client.command = commands[command] || Object.values(commands).find(x => x.aliases.includes(command));
                            client.args = data.content.split(" ").slice(1)

                            if (commands[command]) {
                                commands[command].run(client, data);
                            } else {
                                Object.values(commands).find(x => x.aliases.includes(command)).run(client, data);
                            }
                        } catch(e) {
                            console.log(e);
                        }
                    } else {
                     //   if (events.hasOwnProperty("error")) events.error(client, "commandnotfound", data);
                    }
                } else {
                    if (events.hasOwnProperty("MESSAGE_CREATE")) events.MESSAGE_CREATE(client, data);
                }

                break;

            case "GUILD_CREATE":
                msg.d.prefix = defaultPrefix;
                client.guilds.push(msg.d);
                if (events.hasOwnProperty("GUILD_CREATE")) events.GUILD_CREATE(client, msg.d);
                break;

            case "GUILD_DELETE":
                if (events.hasOwnProperty("GUILD_DELETE")) events.GUILD_DELETE(client, client.guilds[msg.d.id]);
                client.guilds.splice(client.guilds.indexOf(msg.d), 1);
                break;
        }
    })

    ws.on("close", (code, reason) => {
        client.guilds = [];
        console.log(`ERROR - ${code} - ${reason}`);
        setTimeout(require("./gateway.js").run, 10000);
    })
}
