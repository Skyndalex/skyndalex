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

    app.listen(3355, () => console.log(`${pc.yellow('[WEBSITE:3344]')} ${pc.green("Connected")}`));
}