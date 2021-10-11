const r = require("rethinkdb")
module.exports = async (client) => {
    Object.defineProperty(Array.prototype, "random", {
        value: function () {
            return this[Math.floor(Math.random() * this.length)];
        }
    });
}