const { Client } = require("discord.js-light")
const Discord = require("discord.js-light")

class KriveManager extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v2.0"
        this.url = "https://krivebot.xyz"
        this.discord = "https://discord.gg/m6N8mnCBWv"
        this.footer = `KriveBot ${this.version} || ${this.discord}`

    }
}
module.exports = KriveManager;