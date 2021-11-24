const { Client } = require("discord.js");
const strings = require("./strings.json");
// Something will be here soon...
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.strings = strings;
    }
}
module.exports = Base;