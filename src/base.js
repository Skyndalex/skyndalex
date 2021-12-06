const { Client } = require("discord.js")
const strings = require("./strings.json");
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.strings = strings
    }
}
module.exports = Base;