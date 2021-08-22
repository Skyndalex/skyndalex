const express = require("express")
const app = express()

exports.run = (client) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/discord', (req, res) => {
        res.redirect('https://discord.gg/4m6MdMew')
    })
    app.get('/twitter', (req, res) => {
        res.send('https://twitter.com/Krive7')
    })
    app.get('/github', (req, res) => {
        res.send('https://github.com/Korrumz2PL/krivebot')
    })
    app.get('/invite', (req, res) => {
        res.send('https://discord.com/oauth2/authorize?client_id=836529470122622986&scope=bot&permissions=0')
    })

    app.get('*', function (req, res) {
        res.send("404: Not found. Get support here: https://docs.krivebot.xyz/site")
    });
}
app.listen(3214, () => console.log("Site running at http://localhost:3214"))