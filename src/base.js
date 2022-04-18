const { Client, MessageEmbed } = require('discord.js');
const r = require('rethinkdb');

class Base extends Client {
    constructor(clientOptions) {
        super(clientOptions);

        this.version = 'v4.6';
        this.site = 'https://krivebot.xyz';
    }
}
module.exports = Base;
