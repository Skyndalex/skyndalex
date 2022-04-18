const { Client, MessageEmbed } = require('discord.js');
const r = require('rethinkdb');
const strings = require('./utils/strings.json');
class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = 'v4.6';
        this.site = 'https://krivebot.xyz';
        this.strings = strings;

    }
}
module.exports = Base;
