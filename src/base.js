const { Client } = require("discord.js");

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = "v1.0";
        this.site = "https://krivebot.xyz";
    }
}
module.exports = Base;