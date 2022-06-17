const router = require('express').Router()
const { OAuth }  = require("oauth")
const { key, secret, appName, callbackURL } = require("../../config.json").trello

router.get('/trello_success', function (req, res) {
    res.send("OK")
});

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";

const oauth_secrets = {};

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", callbackURL, "HMAC-SHA1")

router.get("/trello_auth", (req, res) => {
    oauth.getOAuthRequestToken((error, token, tokenSecret) => {
        if (error) console.error(error);
        oauth_secrets[token] = tokenSecret;
        res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=read,write,account&expiration=never`);
    });
});

router.get("/trello_callback", (req, res) => {
    const { oauth_token, oauth_verifier } = req.query
    const tokenSecret = oauth_secrets[oauth_token]
    
    oauth.getOAuthAccessToken(oauth_token, tokenSecret, oauth_verifier, async (error, accessToken) => {
        if (error) console.log(error);
        await r.table("trello").get(req.session.user.id).update({ accessToken: accessToken, key: key }).run(req.client.con);

        res.redirect("/trello/trello_success");
    })
})

module.exports = router