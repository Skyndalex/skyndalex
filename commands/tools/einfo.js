const dayjs = require("dayjs")
dayjs.locale("pl")
exports.run = async (client, message, args, level) => {
    client.commandNotEnabled(message, "W trakcie prac")
}
exports.help = {
    name: "einfo",
    description: "Wyswietla informacje o emotce",
    category: "bot",
}