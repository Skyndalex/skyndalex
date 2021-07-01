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

    app.get('/invite', function(req, res) {
        res.redirect('https://discord.com/oauth2/authorize?client_id=836529470122622986&scope=bot&permissions=0');
    });
    app.get('/discord', function(req, res) {
        res.redirect('https://discord.gg/YCxCQ2ZZhA');
    });
    app.get('/public', function(req, res) {
        res.redirect('https://github.com/Korrumz2PL/krivebot');
    });
    
    app.get('*', function(req, res){
        res.render('./views/src/404.ejs')
    });
}
app.listen(3214, () => console.log("Site running at http://localhost:1267"))