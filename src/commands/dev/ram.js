const os = require("os")
exports.run = async (client, message, args) => {
	let dev = ["817883855310684180", "304979757852917762"];
	if (!dev.includes(message.author.id)) return message.channel.send("Niedostępne dla uzytkowników!")

    const rss = `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
    const heapTotal = `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
    const heapUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
    const external = `${(process.memoryUsage().external / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
    const arrayBuffers = `${(process.memoryUsage().arrayBuffers / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`

    message.channel.send(`\`RAM USAGE:\`\n\nrss: ${rss}\nheapTotal: ${heapTotal}\nheapUsed: ${heapUsed}\nexternal: ${external}\narrayBuffers: ${arrayBuffers}`)
}
exports.help = {
	name: "ram",
	aliases: ["r"],
	category: "dev",
}