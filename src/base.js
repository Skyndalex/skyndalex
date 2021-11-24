const { Client } = require("discord.js");
const strings = require("./strings.json");

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v1.0"; // New Skyndalex
        this.strings = strings;
    }
}
module.exports = Base;