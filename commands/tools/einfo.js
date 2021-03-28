const dayjs = require("dayjs")
dayjs.locale("pl")
exports.run = async (client, message, args, level) => {
    message.channel.send("Komenda nie działa.")
}
exports.help = {
    name: "einfo",
    description: "Wyswietla informacje o emotce",
    category: "bot",
}