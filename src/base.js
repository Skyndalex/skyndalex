const { Client } = require("discord.js");
const strings = require("./strings.json");
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.strings = strings
        this.debug = false
    }
}
module.exports = Base;