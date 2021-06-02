const express = require("express")
const app = express()
exports.run = (client) => {
    app.set("view engine", "ejs")
    app.set("views", __dirname)
    app.use(express.static(__dirname + '/public'));

    app.get('/', function (req, res) {
        res.render('./views/src/new.ejs', {
            bot: client
        })
    })
}
app.listen(3214, () => console.log("Site running at http://localhost:1267"))
