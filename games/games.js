const express = require("express")
const app = express()
exports.run = (client) => {
    app.set('view engine', 'ejs')
    app.set("views", __dirname + "/views");

    app.get('/', function (req, res) {
        res.render('gaming/index', {
            bot: client
        })

        //TODO: front-end
    })

    app.listen(2137, () => console.log("Games running at http://localhost:2137"))
}