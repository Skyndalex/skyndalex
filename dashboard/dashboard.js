const express = require("express");
const app = express()
const passport = require("passport")
const passportDiscord = require("passport-discord")
const Strategy = passportDiscord.Strategy;
const { clientSecret } = require("../config.json")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const session = require("express-session");
const MemoryStore = require("memorystore");
const path = require("path")
const url = require("url")
const mStore = MemoryStore(session);
exports.run = (client) => {
    app.set('view engine', 'ejs')
    app.set("views", __dirname);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    const strategy = new Strategy({
            clientID: "829812129074774086",
            clientSecret: clientSecret,
            callbackURL: "http://localhost:1276/callback", // The url that will handle callbacks.
            scope: ["identify", "guilds", "guilds.join"] // Get tag and profile picture + servers user is in.
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
        });

    passport.use(strategy);

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        store: new mStore({ checkPeriod: 86400000 }), // we refresh the store each day
        secret: "A_RANDOM_STRING_FOR_SECURITY_PURPOSES_OH_MY",
        resave: false,
        saveUninitialized: false
    }));

    app.get("/login", (req, res, next) => {
        if (req.session.backURL) {
            req.session.backURL = req.session.backURL;
        } else {
            req.session.backURL = "/";
        }
        //
        next();
    }, passport.authenticate("discord"));

    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => { // Passport collects data that discord has returned and if user aborted auhorization it redirects to '/'
        session.us = req.user;
        if (req.session.backURL) {
            const url = req.session.backURL;
            req.session.backURL = null;
            res.redirect(url);
        } else {
            res.redirect("/");
        }
    });

    app.get("/dashboard", (req, res) => {
        res.render("pages/general", {
            bot: client,
            user: req.isAuthenticated() ? req.user : null
        })
    })

    const authenticate = (req, res, next) => {
        if (req.isAuthenticated()) return next(); // If the user is logged in, we skip execution of the rest of the code in this function and let the code for te route run.
        req.session.backURL = req.url; // If execution reached this point, means that user is not logged in and we can set the return url to the current url.
        res.redirect("/login"); // And we redirect it to our login handler that will do the job.
    };

    app.get("/logout", function (req, res) {
        req.session.destroy(() => { // We destroy session
            req.logout(); // Inside callback we logout user
            res.redirect("logout.ejs"); // And to make sure he isnt on any pages that require authorization, we redirect it to main page.
        });
    });
    app.get("/", function (req, res) {
        res.render('./views/pages/general.ejs', {
            bot: client,
            user: req.isAuthenticated() ? req.user : null
        })
    })
    app.listen(1276, () => console.log("Dashboard running at http://localhost:1267"))
}