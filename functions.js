const { MessageEmbed } = require("discord.js")
module.exports = (client) => {
    Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
   
}