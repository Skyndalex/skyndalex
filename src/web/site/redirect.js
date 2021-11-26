const express = require("express");
const path = require("path");
exports.run = (client) => {
    let app = express();

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

    app.listen(3214, () => console.log("http://localhost:3214"));
}