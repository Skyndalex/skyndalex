const express = require("express")
const path = require("path")
const app = express()

exports.run = (client) => {
    app.use(express.static(__dirname + '/public'));

    let options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    app.get('/', function (req, res) {
        res.sendFile('index.html', options)
    });
    app.get('/discord', (req, res) => {
        res.redirect('https://discord.gg/4m6MdMew')
    });
    app.get('/twitter', (req, res) => {
        res.redirect('https://twitter.com/Krive7')
    });
    app.get('/github', (req, res) => {
        res.redirect('https://github.com/Korrumz2PL/krivebot')
    });
    app.get('/invite', (req, res) => {
        res.redirect('https://discord.com/oauth2/authorize?client_id=836529470122622986&scope=bot&permissions=0')
    });

    app.get('*', function (req, res) {
        res.send("404: Not found. Get support here: https://docs.krivebot.xyz/site")
    });
}
app.listen(3214, () => console.log("http://localhost:3214"))