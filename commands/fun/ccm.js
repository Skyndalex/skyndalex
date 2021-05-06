const { createCanvas, loadImage } = require("canvas")
const discord = require("discord.js")
exports.run = async (client, message, args) => {
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')

    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Hello world!', 50, 100)

    let text = ctx.measureText("Hello world!")

    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()

 const img = await loadImage('./commands/fun/funResources/img/ccm.png').then((image) => {
        ctx.drawImage(image, 50, 0, 70, 70)

     message.channel.send(img)

    })
}
exports.help = {
    name: "ccm",
    description: "Wysyła podanie",
    category: "fun",
}