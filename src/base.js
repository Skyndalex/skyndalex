const { Client } = require('discord.js');
const strings = require('./Utils/json/strings.json');

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = 'v1.0 BETA';
        this.site = 'https://skyndalex.xyz';
        this.strings = strings;
    }
}

module.exports = Base;
