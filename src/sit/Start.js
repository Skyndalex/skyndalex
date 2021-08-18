const express = require("express")
const app = express()

exports.run = (client) => {
    app.get('/', function (res) {
        res.send("Przerwa techniczna z stroną internetową!")
    })

    app.get('/discord', function (res) {
        res.redirect("https://discord.gg/nQvXFFqjwP")
    })
    app.get('/twitter', function (res) {
        res.redirect("https://twitter.com/Krive7")
    })
    app.get('/invite', function (res) {
        res.redirect("https://discord.com/oauth2/authorize?client_id=836529470122622986&scope=bot&permissions=2150968326")
    })
    app.get('/github', function (res) {
        res.redirect("https://github.com/Korrumz2PL/krivebot")
    })

    app.get('*', function (res) {
        res.send("404: Not found. Get support here: https://docs.krivebot.xyz/site")
    });
}
app.listen(3214, () => console.log("Site running at http://localhost:3214"))